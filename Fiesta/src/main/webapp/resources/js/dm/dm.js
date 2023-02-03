const down = document.getElementsByClassName("down")[0];
const right = document.getElementById("right")
const up = document.getElementById("up");
const noClick = document.getElementById("no-click");
const click = document.getElementById("click");
const message = document.getElementById("dm-message");
const dmMenu = document.getElementsByClassName("feed-menu-container")[0];
const sendMessageBtn = document.getElementById("sendMessageBtn");
const chatModal = document.getElementById("chatModal");


document.addEventListener("DOMContentLoaded", ()=>{

    dmMenu.style.display = "none";
    click.style.display = "none";

    right.style.justifyContent = "center";

});

sendMessageBtn.addEventListener("click", ()=>{

    dmMenu.style.display = "flex";

})


const proImg = document.getElementById("proImg")
const nextButton = document.getElementById("nextButton");
const messageName = document.getElementById("messageName");



const memberListArea = document.getElementById("memberListArea");


const modalNick = document.getElementsByClassName("modalNick");
const recipient = document.getElementById("Recipient");

// 받는 사람에 입력 있을시
const sendPeople = document.getElementById("sendPeople");
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
          sendPeople.value = '';
          

          // $.ajax({
          //   url : "/dm/enter",
          //   data : {"targetNo" : item.children[0].value},
          //   dataType:"JSON",
          //   success : ()=>{
          //     console.log("성공");
          //   }
  
          // });

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

  console.log(targetNo);

  $.ajax({
    url: "/dm/enter",
    data: { "targetNo": targetNo },
    dataType: "json",
    success: (map) => {
      console.log("되는건가?");
      console.log(map);

      const messageList = map.messageList;

      // 전역변수 targetNo에 타겟넘버 저장
      selectTargetNo = map.targetNo;
      selectChattingNo = map.chattingNo;

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

    },
    error: () => {
      console.log("채팅방 입장에러");
    }
    
  })


  dmMenu.style.display = "none";
  noClick.style.display = "none";
  click.style.display = "flex";
  messageName.innerText = recipient.innerText;

  const RecipientMemberNick = recipient.innerText;

})


const dmOpen = document.getElementById("dmOpen");
dmOpen.addEventListener("click", ()=>{

  dmMenu.style.display = "flex";

})


// dm 메세지 모달 X버튼
const x = document.getElementsByClassName("x")[0];
x.addEventListener("click", ()=>{

  dmMenu.style.display = "none";
})



// 로그인이 되어 있을 경우에만
// /chattingSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
if(loginMemberNo != ""){
	chattingSock = new SockJS("/chattingSock");
}

document.addEventListener("DOMContentLoaded", ()=>{

  roomListAddEvent();

  //  send.addEventListener("click", sendMessage);

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

//optimize: 채팅방 목록에 이벤트를 추가하는 함수
const roomListAddEvent = () =>{
  const chattingItemList = document.getElementsByClassName("dm-item");

  for(let item of chattingItemList){
    item.addEventListener("click", e =>{

      const id = item.getAttribute("id");
      const arr = id.split("-");

      selectChattingNo = arr[0]
      selectTargetNo = arr[1];
      selectTargetProfile = item.children[0].children[0].getAttribute("src");
      selectTargetName = item.children[1].children[0].children[0].innerText;

      if(item.children[1].children[1] != undefined){
        item.children[1].children[1].remove();
      }

      for(let it of chattingItemList) it.classList.remove("select")

      item.classList.add("select")

      selectChattingFn();

    });
  }
}


const chatProfile = document.getElementById("chatProfile");

// 비동기로 메세지 목록을 조회하는 함수
const selectChattingFn = () =>{
  console.log(selectChattingNo);

  $.ajax({
    url : "/dm/selectMessage",
    data:{"chattingNo" : selectChattingNo},
    dataType : "JSON",
    success : (messageList) =>{

      noClick.style.display = "none";
      click.style.display = "flex";
      messageName.innerText = selectTargetName;
      chatProfile.setAttribute("src", selectTargetProfile);

      const ul = document.querySelector(".dm-area");
      ul.innerHTML = "";

      for(let msg of messageList){
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.classList.add("chat-Date");
        span.innerText = msg.sendTime;

        const p = document.createElement("p");
        p.classList.add("chat");
        p.innerHTML = msg.messageContent;

        if(loginMemberNo == msg.senderNo){
          li.classList.add("my-chat");

          li.append(span, p);

        } else{
          li.classList.add("target-chat");

          const img = document.createElement("img");
          img.setAttribute("src", selectTargetProfile);

          const div = document.createElement("div");

          const b = document.createElement("b");
          b.innerText = selectTargetName;

          const br = document.createElement("br");

          div.append(b,br,p,span);
          li.append(img,div);
        }
        ul.append(li);
        dmArea.scrollTop = dmArea.scrollHeight;
      }

    },
      error : () => {
        console.log();}      
      
  })
 
}

// 비동기로 채팅방 목록 조회
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

        itemBody.append(itemBodyLeft, itemBodyRight);
        li.append(itemHeader, itemBody);
        chattingList.append(li);

      }
      roomListAddEvent();
      // selectRoomList();
    }
  })

}

// 채팅 입력
const sendMessage = () =>{
  const chattingInput = document.getElementById("chattingInput");
  console.log(selectTargetNo);
  if(chattingInput.value.trim().length == 0){
    chattingInput.value = "";
  } else{
    var obj = {
      "senderNo": loginMemberNo,
      "targetNo" : selectTargetNo,
      "chattingNo" : selectChattingNo,
      "messageContent" : chattingInput.value,
    };

    console.log(targetNo);
    console.log(selectChattingNo);
    
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
