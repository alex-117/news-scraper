 $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $(".modal").modal();
     
     $(".card").on("click", function(event) {
         event.preventDefault();
         
         console.log(this)
     })
     
     
     
     
//     <!-- Modal Trigger -->
//  <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
//
//  <!-- Modal Structure -->
//  <div id="modal1" class="modal">
//    <div class="modal-content">
//      <h4>Modal Header</h4>
//      <p>A bunch of text</p>
//    </div>
//    <div class="modal-footer">
//      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
//    </div>
//  </div>
//     
     
     
     
     
  });

$(".modal").modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: "4%", // Starting top style attribute
      endingTop: "10%", // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
      },
      complete: function() { alert("Closed"); } // Callback for Modal close
    }
  );

