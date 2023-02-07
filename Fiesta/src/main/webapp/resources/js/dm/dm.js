const down = document.getElementsByClassName("down")[0];
const right = document.getElementById("right")
const up = document.getElementById("up");
const noClick = document.getElementById("no-click");
const click = document.getElementById("click");
const message = document.getElementById("dm-message");
const dmMenu = document.getElementsByClassName("feed-menu-container")[0];
const sendMessageBtn = document.getElementById("sendMessageBtn");
const chatModal = document.getElementById("chatModal");

const proImg = document.getElementById("proImg")
const nextButton = document.getElementById("nextButton");
const messageName = document.getElementById("messageName");

const memberListArea = document.getElementById("memberListArea");

const modalNick = document.getElementsByClassName("modalNick");
const recipient = document.getElementById("Recipient");
const sendPeople = document.getElementById("sendPeople");

document.addEventListener("DOMContentLoaded", ()=>{

    dmMenu.style.display = "none";
    click.style.display = "none";

    right.style.justifyContent = "center";

});

// 메세지 보내기 버튼 클릭 시
sendMessageBtn.addEventListener("click", ()=>{

    dmMenu.style.display = "flex";
    recipient.style.display = "none";

    memberListArea.innerHTML = "";
    sendPeople.value = "";
})


// 닉네임 옆 쓰기 아이콘 클릭 시
const dmOpen = document.getElementById("dmOpen");
dmOpen.addEventListener("click", ()=>{

  dmMenu.style.display = "flex";
  recipient.style.display = "none";

  memberListArea.innerHTML = "";
  sendPeople.value = "";
  sendPeople.focus();

})


// dm 메세지 모달 X버튼
const x = document.getElementsByClassName("x")[0];
x.addEventListener("click", ()=>{

  dmMenu.style.display = "none";
})

const dmContainer = document.getElementById("chatModal");
window.addEventListener('click', (e) => {
   // DM 모달창 밖 클릭 시 닫힘
   e.target === dmContainer ? dmContainer.style.display = 'none' : false
});



// 모달) 받는 사람에 입력 있을시
sendPeople.addEventListener("input", ()=>{

  $.ajax({  
    url: "/dm/selectMember",
    data: {"memberNickname": sendPeople.value},
    type:"GET",
    dataType:"JSON",
    success : (memberList)=>{
      memberListArea.innerHTML = "";
      
      
      for(let member of memberList){
        const li = document.createElement("li");
        const input = document.createElement("input")
        const img = document.createElement("img");
        const span = document.createElement("span");
        const targetNoInput = document.createElement("input");


        memberListArea.append(li);
        input.setAttribute('type', 'hidden');
        input.setAttribute("value", member.memberNo);
        input.setAttribute("name", 'targetNo');


        li.classList.add("chatMember")
        li.append(input,img, span, targetNoInput);
        img.classList.add("modalProfile")
        span.classList.add("modalNick")
        targetNoInput.setAttribute('type', 'hidden');
        targetNoInput.value = member.memberNo;
        
        if(member.memberProfileImg == null){
          img.setAttribute("src", "/resources/images/user.jpg")
        } else{
          img.setAttribute("src", member.memberProfileImg)
        }

        span.innerText = member.memberNickname;


        li.addEventListener("click", e => {
          targetNo = member.memberNo;

          recipient.innerText = "";  
          recipient.innerText = member.memberNickname;  
          recipient.style.display = "inline";
          recipient.style.backgroundColor = "rgba(221, 64, 50, 0.3)";
          
          sendPeople.value = "";
        })
      }
    },
    error: ()=>{
      console.log("실패");
    }
  }); 
})



// 선택한 채팅방 번호를 저장하기 위한 전역변수
let selectChattingNo;
let selectTargetNo;
let selectTargetName;
let selectTargetProfile;

let chattingSock;



//fixme 다음 클릭
nextButton.addEventListener("click", () => {
  chatModal.style.display = "none";
  console.log("채팅방 생성 targetNo : " + targetNo);

  $.ajax({
    url: "/dm/enter",
    data: { "targetNo": targetNo },
    dataType: "json",
    success: (map) => {
      console.log("되는건가?");

      const messageList = map.messageList;

      // 전역변수 targetNo에 타겟넘버 저장
      selectTargetNo = map.targetNo;
      selectChattingNo = map.chattingNo;

      selectRoomList(); 
      selectChattingFn();

      if(tempNo != ""){
        const chattingItemList = document.getElementsByClassName("dm-item");
    
        for(let item of chattingItemList){
    
          const id= item.getAttribute("id");  
          const arr = id.split("-");
    
          if(arr[0] == tempNo){
            item.click();
            break;
          }
        }
      }
    },
    error: () => {
      console.log("채팅방 입장에러");
    }
    
  })

  dmMenu.style.display = "none";
  noClick.style.display = "none";
  click.style.display = "flex";
  // messageName.innerText = recipient.innerText;

  const RecipientMemberNick = recipient.innerText;

})




// 로그인이 되어 있을 경우에만
// /chattingSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
if(loginMemberNo != ""){
	chattingSock = new SockJS("/chattingSock");
}


document.addEventListener("DOMContentLoaded", ()=>{

  // roomListAddEvent();
  selectRoomList();

  if(tempNo != ""){
    const chattingItemList = document.getElementsByClassName("dm-item");

    for(let item of chattingItemList){

      const id= item.getAttribute("id");  
      const arr = id.split("-");

      if(arr[0] == tempNo){
        item.click();
        break;
      }
    }

  }
})



const dmArea = document.getElementsByClassName("dm-area")[0];
//optimize
/** 채팅방 목록에 이벤트를 추가하는 함수*/
const roomListAddEvent = () =>{
  const chattingItemList = document.getElementsByClassName("dm-item");

  for(let item of chattingItemList){
    item.addEventListener("click", e =>{

      const id = item.getAttribute("id");
      const arr = id.split("-");

      selectChattingNo = arr[0];
      selectTargetNo = arr[1];
      selectTargetProfile = item.children[0].children[0].getAttribute("src");
      selectTargetName = item.children[1].children[0].children[0].children[0].innerText;

      if(item.children[1].children[1] != undefined){
        item.children[1].children[1].remove();
      }

      for(let it of chattingItemList) it.classList.remove("select")

      item.classList.add("select")

      selectChattingFn();
      updateReadFlag();

    });
  }
}


const chatProfile = document.getElementById("chatProfile");
//optimize 
/** 비동기로 채팅창 프로필 조회하는 함수*/
const selectChattingProfile = () => {
  $.ajax({
    url : "/dm/selectChattingProfile",
    data:{"chattingNo" : selectChattingNo, "targetNo": selectTargetNo},
    dataType : "JSON",
    success : (targetProfile) =>{  
      // 채팅방 프로필 조회
      noClick.style.display = "none";

      click.style.display = "flex";
      const clickUp = document.getElementById("clickUp");
      clickUp.innerHTML = "";

      const divProfile = document.createElement("div");
      divProfile.className = "profile-div"

      const aProImg = document.createElement("a");
      aProImg.id = "proImg";

      const chatProfileImg = document.createElement("img");
      chatProfileImg.id = "chatProfile";

      // 미디어쿼리
      var mediaQuery = window.matchMedia("screen and (max-width: 470px)");
       
      // 모바일 사이즈
      if(mediaQuery.matches){

        // 프로필 사진 대신 뒤로가기로. (목록으로 이동)
        aProImg.setAttribute("href", "/dm/dm");
        chatProfileImg.style.width = "30px"
        chatProfileImg.setAttribute("src", "/resources/images/arrow-left-long-solid.png")

      } else{
        chatProfileImg.style.width = "50px";
        
        if(targetProfile.memberProfileImg != null){
          aProImg.setAttribute("href", "/feed/" + targetProfile.memberNickname);
          chatProfileImg.setAttribute("src", targetProfile.memberProfileImg);
        } else {
          chatProfileImg.setAttribute("src", "/resources/images/profile/profile.jpg");
        }
      } 

      aProImg.appendChild(chatProfileImg);

      const messageName = document.createElement("div");
      messageName.id = "messageName";
      messageName.innerText = targetProfile.memberNickname;

      const buttonInfo = document.createElement("button");
      buttonInfo.id = "info";

      const imgInfo = document.createElement("img");
      imgInfo.setAttribute("src", "/resources/images/info.png");
      imgInfo.style.width = "24px"

      buttonInfo.append(imgInfo);

      divProfile.append(aProImg, messageName, buttonInfo);
      clickUp.append(divProfile);
    }, 
    error: () => {
      console.log("채팅창 프로필 조회 실패");
    }
  
  })
 
}





//optimize 
/**비동기로 메세지 목록을 조회하는 함수*/
const selectChattingFn = () =>{
  
  noClick.style.display = "none";
  click.style.display = "flex";

  console.log("메시지목록 selectChattingNo : " + selectChattingNo);
  selectChattingProfile();

  $.ajax({
    url : "/dm/selectMessage",
    data:{"chattingNo" : selectChattingNo, "targetNo": selectTargetNo},
    dataType : "JSON",
    success : (messageList) =>{
      const ul = document.querySelector(".dm-area");
      ul.innerHTML = "";

      // 메세지 내역 조회
      for(let msg of messageList){
        const sendDate = document.createElement("div");

        // 하루 날짜
        if(msg.dateRank == 1){
          sendDate.classList.add("chat-date");
          sendDate.innerText = msg.chatSendDate;
        } else {
          sendDate.innerText = "";
        }

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.classList.add("chat-sendtime");
        span.innerText = msg.chatSendTime;

        const p = document.createElement("p");
        p.classList.add("chat");
        p.innerHTML = msg.messageContent;

        if(loginMemberNo == msg.senderNo){
          p.classList.add("my-message");
          li.classList.add("my-chat");

          li.append(span, p);

        } else{
          p.classList.add("your-message");
          li.classList.add("target-chat");

          const img = document.createElement("img");
          img.setAttribute("src", selectTargetProfile);
          img.classList.add("chat-profile");

          const div = document.createElement("div");
          div.classList.add("chat-content");

          // const chatName = document.createElement("span");
          // chatName.innerText = selectTargetName;
          // chatName.classList.add("chat-name");

          const br = document.createElement("br");

          // div.append(chatName,br,p,span);
          div.append(br,p,span);
          li.append(img,div);
        }
        
        ul.append(sendDate, li);
        chattingRoom.scrollTop = chattingRoom.scrollHeight;

        //fixme
        // 메시지 목록 불러왔을 때,
        // 메시지 목록 없이 화면 밖으로 나가면
        // 채팅방 지우기

      }

      chattingInput.focus();
    },
      error : () => {
        console.log("메시지 목록 조회 실패");}      
      
  })

  selectRoomList();
 
}





//optimize 
/** 비동기로 채팅방 목록 조회 */
const selectRoomList = () =>{
  $.ajax({
    url : "/dm/roomList",
    data : {"memberNo" : loginMemberNo},
    dataType : "JSON",
    success : roomList =>{

      const chattingList = document.querySelector(".dm-list");

      chattingList.innerHTML = "";

      for(let room of roomList){
        const li = document.createElement("li");
        li.classList.add("dm-item");
        li.setAttribute("id", room.chattingNo + "-" + room.targetNo);

        if(room.chattingNo == selectChattingNo){
          li.classList.add("select");
        }

        const itemHeader = document.createElement("div");
        itemHeader.classList.add("item-header");

        const listProfile = document.createElement("img");
        listProfile.classList.add("target-profile");

        if(room.targetProfile == undefined){
          listProfile.setAttribute("src", "/resources/images/profile/profile.jpg");
        } else{
          listProfile.setAttribute("src", room.targetProfile);
        }

        itemHeader.append(listProfile);

        const itemBody = document.createElement("div");
        itemBody.classList.add("item-body");

        const itemBodyLeft = document.createElement("div");
        itemBodyLeft.classList.add("item-body-left");

        const itemBodyUp = document.createElement("div");
        itemBodyUp.classList.add("item-body-up");

        const targetName = document.createElement("span");
        targetName.classList.add("target-name");
        targetName.innerText = room.targetNickName;

        const recentSendTime = document.createElement("span");
        recentSendTime.classList.add("recent-send-time");
        recentSendTime.innerText = room.sendTime;

        itemBodyUp.append(targetName, recentSendTime);
        
        const recentMessage = document.createElement("p");
        recentMessage.classList.add("recent-message");
        
        if(room.lastMessage != undefined){
          recentMessage.innerHTML = room.lastMessage;

        } 

        itemBodyLeft.append(itemBodyUp, recentMessage);


        const itemBodyRight = document.createElement("span");
        itemBodyRight.classList.add("item-body-right");
 

   
        if(room.notReadCount > 0 && room.chattingNo != selectChattingNo){
          const notReadCount = document.createElement("p");
          notReadCount.classList.add("not-read-count");
          notReadCount.innerText = room.notReadCount;
          itemBodyRight.append(notReadCount);

        } else{
          updateReadFlag();
        }

        itemBody.append(itemBodyLeft, itemBodyRight);
        li.append(itemHeader, itemBody);
        chattingList.append(li);

      }
      roomListAddEvent();
      // selectRoomList();
    }
  })
}


/**채팅 목록에서 readCount 없애기 */ 
const updateReadFlag = () =>{
  $.ajax({
    url : "/dm/updateReadFlag",
    data : {"chattingNo" : selectChattingNo, "memberNo" : loginMemberNo},
    type:"GET",
    success : result => {
      console.log(result);
    },
    error : () => {
      console.log("실패");
    }
  })
}


/** 채팅방 나가기 (채팅 내용 없는 채팅창 없애기) */ 
const deleteRoom = () => {
  $.ajax({
    url: "/dm/deleteRoom",
    data: {"chattingNo" : selectChattingNo},
    type: "GET",
    sucess: () => {
      console.log("채팅방 나가기");
    }, error : () => { console.log("채팅방 삭제 실패"); }
  })
}





const chattingInput = document.getElementById("chattingInput");
/** 채팅 입력 */
const sendMessage = () =>{
  // console.log("채팅입력 selectTargetNo : " + selectTargetNo);
  // console.log("채팅입력 loginMemberNo : " + loginMemberNo);
  // console.log("채팅입력 selectChattingNo : " + selectChattingNo);
  // console.log("채팅입력 chattingInput.value : " + chattingInput.value);

  if(chattingInput.value.trim().length == 0){
    chattingInput.value = "";
  } else{
    var obj = {
      "senderNo": loginMemberNo,
      "targetNo" : selectTargetNo,
      "chattingNo" : selectChattingNo,
      "messageContent" : chattingInput.value,
    };

    chattingSock.send(JSON.stringify(obj));

    chattingInput.value = "";
  }
}

chattingInput.addEventListener("keyup", e=>{
  if(e.key == "Enter"){
    if(!e.shiftKey){
      sendMessage();
    }
  }
})

const chattingRoom = document.getElementById("chattingRoom");

// WebSocket 객체 chattingSock이 서버로 부터 메세지를 통지 받으면 자동으로 실행될 콜백 함수
chattingSock.onmessage = function(e){
  const msg = JSON.parse(e.data);


  console.log(msg);
  console.log(msg.sendDate);
  console.log(msg.sendTime);

  if(selectChattingNo == msg.chattingNo){

    // noClick.style.display = "none";
    // click.style.display = "flex";
    // messageName.innerText = selectTargetName;
    // chatProfile.setAttribute("src", selectTargetProfile);

    const ul = document.querySelector(".dm-area");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.classList.add("chatDate");
    span.innerText = msg.SendDate;

    const p = document.createElement("p");
    p.classList.add("chat");
    p.innerHTML = msg.messageContent;

    if(loginMemberNo == msg.senderNo){
      li.classList.add("my-chat");
      li.append(span, p);

    } else {
    li.classList.add("target-chat");

    const img = document.createElement("img");
    img.setAttribute("src", selectTargetProfile);

    const div = document.createElement("div");

    const b = document.createElement("b");
    b.innerText = selectTargetName;

    const br = document.createElement("br");

    div.append(b, br, p, span);
    li.append(img, div);

    }  

  ul.append(li);
  chattingRoom.style.scrollTop = chattingRoom.style.scrollHeight;
  }

 selectChattingFn();
}



const openNo = () => {

  $.ajax({
    url : "/dm/openNo",
    data: {"memberNickname" : RecipientMemberNick},
    success : () => {
      console.log("성공");
    }
  })

}

