module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // function getRegions(res, mysql, context, complete){
    //     mysql.pool.query("SELECT Region_ID as id, Name, Location FROM Region", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.region = results;
    //         complete();
    //     });
    // }

    function getAlliances(res, mysql, context, complete){
        mysql.pool.query("SELECT Alliance_ID as id, Leader, Enemies, Friends, Neutrals FROM Alliance", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.alliance  = results;
            complete();
        });
    }

    // function getCharacters(res, mysql, context, complete){
    //     //mysql.pool.query("SELECT Major_Character.Character_ID as id, Major_Character.Name as Name, Region.Name AS Home, Alliance.Leader AS Alliance, Major_Character.Seasons as Seasons, Major_Character.Trait as Trait FROM Major_Character INNER JOIN Region ON Major_Character.Home = Region.Region_ID INNER JOIN Alliance ON Major_Character.Alliance = Alliance.Alliance_ID", function(error, results, fields){
    //     mysql.pool.query("SELECT Major_Character.Character_ID as id, Major_Character.Name as Name, Region.Name AS Home, Alliance.Leader AS Alliance, Major_Character.Seasons as Seasons, Major_Character.Trait as Trait FROM Major_Character INNER JOIN Region ON Major_Character.Home = Region.Region_ID INNER JOIN Alliance on Major_Character.Alliance = Alliance.Alliance_ID ORDER BY id", function(error, results, fields){
    //         //console.log(results);
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.character = results;
    //         complete();
    //     });
    // }

    // /* Find people whose fname starts with a given string in the req */
    // function getCharactersWithNameLike(req, res, mysql, context, complete) {
    //   //sanitize the input as well as include the % character
    //    var query = "SELECT Major_Character.Character_ID as id, Major_Character.Name as Name, Region.Name AS Home, Alliance.Leader AS Alliance, Major_Character.Seasons as Seasons, Major_Character.Trait as Trait FROM Major_Character INNER JOIN Region ON Major_Character.Home = Region.Region_ID INNER JOIN Alliance ON Major_Character.Alliance = Alliance.Alliance_ID WHERE Major_Character.name LIKE " + mysql.pool.escape(req.params.s + '%');
    //   console.log(query)

    //   mysql.pool.query(query, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.character = results;
    //         complete();
    //     });
    // }

    // function getCharacter(res, mysql, context, id, complete){
    //     //var sql = "SELECT Character_ID as id, Name, Home, Alliance, Seasons, Trait FROM Major_Character WHERE Character_ID = ?";
    //     var sql = "SELECT Character_ID as id, Name, Home, Alliance, Seasons, Trait FROM Major_Character WHERE Character_ID = ?";
    //     var inserts = [id];
    //     mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.character = results[0];
    //         complete();
    //     });
    // }

    // /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteCharacter.js","searchCharacter.js"];
        var mysql = req.app.get('mysql');
        //getCharacters(res, mysql, context, complete);
        //getRegions(res, mysql, context, complete);
        getAlliances(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('alliance', context);
            }

        }
    });
    
    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    // router.get('/filter/:homeworld', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
    //     var mysql = req.app.get('mysql');
    //     getPeoplebyHomeworld(req,res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('people', context);
    //         }

    //     }
    // });
    
    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    // router.get('/search/:s', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteCharacter.js","searchCharacter.js"];
    //     var mysql = req.app.get('mysql');
    //     getCharactersWithNameLike(req, res, mysql, context, complete);
    //     getRegion(res, mysql, context, complete);
    //     getAlliance(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 3){
    //             res.render('character', context);
    //         }
    //     }
    // });

    // /* Display one person for the specific purpose of updating people */

    // router.get('/:id', function(req, res){
    //     callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["selectedRegion.js", "selectedAlliance.js","updateCharacter.js"];
    //     var mysql = req.app.get('mysql');
    //     getCharacter(res, mysql, context, req.params.id, complete);
    //     getRegion(res, mysql, context, complete);
    //     getAlliance(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 3){
    //             res.render('update-character', context);
    //         }

    //     }
    // });

    // /* Adds a person, redirects to the people page after adding */
    //add works, but new person added does not appear at the end
    router.post('/', function(req, res){
        //console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Alliance (Leader, Enemies, Friends, Neutrals) VALUES (?,?,?,?)";
        var inserts = [req.body.Leader, req.body.Enemies, req.body.Friends, req.body.Neutrals];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/alliance');
            }
        });
    });

    // /* The URI that update data is sent to in order to update a person */

    // router.put('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     console.log(req.body)
    //     console.log(req.params.id)
    //     if(req.body.Alliance === "null") {
    //         req.body.Alliance = null;
    //     }
    //     var sql = "UPDATE Major_Character SET Name=?, Home=?, Alliance=?, Seasons=?, Trait=? WHERE Character_ID=?";
    //     var inserts = [req.body.Name, req.body.Home, req.body.Alliance, req.body.Seasons, req.body.Trait, req.params.id];
    //     sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    //         if(error){
    //             console.log(error)
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
    //             res.status(200);
    //             res.end();
    //         }
    //     });
    // });

    // // /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    // router.delete('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     var sql = "DELETE FROM Major_Character WHERE Character_ID = ?";
    //     var inserts = [req.params.id];
    //     sql = mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             console.log(error)
    //             res.write(JSON.stringify(error));
    //             res.status(400);
    //             res.end();
    //         }else{
    //             res.status(202).end();
    //         }
    //     })
    // })

    return router;
}();