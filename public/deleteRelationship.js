/*
function deleteCharacter(id){
    $.ajax({
        url: '/character/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
*/

function deleteRelationship(Character_ID, Family_ID){
  $.ajax({
      url: '/character_family/Character_ID/' + Character_ID + '/Family_ID/' + Family_ID,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};
