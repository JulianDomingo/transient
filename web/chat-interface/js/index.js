/* Firebase initialization */
var config = {
  apiKey: "AIzaSyCubWxjE69MSMfZ9UiVRSLIkcc4QdyAsq0",
  authDomain: "transient-318de.firebaseapp.com",
  databaseURL: "https://transient-318de.firebaseio.com",
  projectId: "transient-318de",
  storageBucket: "transient-318de.appspot.com",
  messagingSenderId: "124852436250"
};

firebase.initializeApp(config); 

/* Ran once the DOM is ready for JavaScript execution. */
$(document).ready(function() {
      $('.user-profile').click(function() {
          if (!$(this).hasClass('active')) {
              
              $('.user-profile.active').removeClass('active');
              $(this).addClass('active');
              
              var temp = $('#'+$(this).attr('data-up'));
              
              hideUI('.chat-container')
              showUI('#'+$(this).attr('data-up'));
              temp.addClass('active').removeClass('hidechat');
              temp.prevAll('.chat-container').addClass('hidechat').removeClass('active');
              temp.nextAll('.chat-container').removeClass('active').removeClass('hidechat');
          }
      });

      showUI('#cont1');

      updateUI();
});
  
/* Triggers when the auth state change for instance when the user signs-in or signs-out. */
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // TODO: Show channels, (friends ?), live + scheduled channels for the 
        // registered firebase user.
        updateUI(firebaseUser);
    }
    else {
        console.log('Signing out user...');
        window.location = '../../index.html';
    }
});

/* Grab data from firebase and dynamically update the webpage based on the user. */
function updateUI(firebaseUser) {
    // TODO:
}

/* Displays the UI for 'ele'. */ 
function showUI(ele) {
    console.log($(ele));
    var kids = $(ele).children(), temp;

    for (var i = kids.length - 1; i >= 0; i--) {
        temp  = $(kids[i]);
        
        if (temp.is('div')) {
            temp.animate({
                marginTop:0,
            },400).css({opacity:1}).fadeIn()
        }
        else {
            temp.css({opacity:1}).fadeIn()
        }   
    }
}

/* Hides the UI for 'ele'. */
function hideUI(ele) {
    console.log($(ele));
    var kids = $(ele).children(), temp;

    for (var i = kids.length - 1; i >= 0; i--) {
        temp  = $(kids[i]);
        
        if (temp.is('div')) {
            temp.animate({
                marginTop:'30px',
            }).css({opacity:0});
        }
        else {
            temp.css({opacity:0});
        }   
    }
}

/* Displays the channel action interface. */
$("#new-chat").click(function() {
  $("#myModal").show();
  $("#modal-choose-action").show();
});

/* Hides the channel action interface. */
$(".close").click(function() {
  $("#myModal").hide();
});

/* Displays channel action interface from clicking new chat button. */
$(document).click(function(event) {
    if ($(event.target).is('#myModal') && !$(event.target).is('#new-chat')) {
        if ($('#myModal').css('display') != 'none') 
        {
            // Show channel action interface.
            $('#myModal').hide();
            $("#modal-choose-action").show();
            $("#modal-join-channel").hide();
            $("#modal-create-channel").hide();
        }
    }
});

/* Handles logout for the user. */
$("#logoutbtn").click(function() {
    console.log("signing out user");
    firebase.auth().signOut();
});

/* Displays the interface for joining a channel. */
$("#goToJoin").click(function() {
    console.log("going to join modal");

    $("#modal-choose-action").hide();
    $("#modal-join-channel").show();
});

/* Displays the interface for creating a channel. */
$("#goToCreate").click(function() {
    console.log("going to create modal");

    $("#modal-choose-action").hide();
    $("#modal-create-channel").show();
});

/* Displays the channel action interface. */ 
$(".backToAction").click(function() {
    console.log("Going to back to original Modal");

    $("#modal-create-channel").hide();
    $("#modal-join-channel").hide();
    $("#modal-choose-action").show();
});

/* Creation of channel logic. */
$("#create-channel-button").click(function() {
    console.log("Creating channel...");    

    var channelName = document.querySelector('#channel-name').value;

    var db = firebase.database();
    var currentUserLiveChannelsRef = db.ref('users/' + firebase.auth().currentUser.uid + '/live-channels/');
                                     
    var newLiveChannelRef = currentUserLiveChannelsRef.push({
        name: channelName
    });  

    // TODO: Provide this hash to the channel creator
    var channelInvitationHash = newLiveChannelRef.key;

    $("#myModal").hide();
    $("#modal-create-channel").hide();

    // TODO: Swap the chat box to the created channel and display modal 
    // with 'channelInvitationHash' string for the channel creator
    // to copy + share.
});

