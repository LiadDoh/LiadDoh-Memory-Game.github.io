function checkPlayerNames() {
    return new Promise((resolve, reject) => { // returns a promise
        let p1 = document.getElementById("player1").value; // get the player1 name
        let p2 = document.getElementById("player2").value; // get the player2 name
        if (p1.length > 2 && p2.length > 2 && p1 !== p2 && p1.length <= 12 && p2.length <= 12) { // if the names are valid
            resolve(); // resolve the promise
        } else { // if the names are not valid
            console
            reject(); // reject the promise
        }
    });
}

async function checkForm(form) {
    await checkPlayerNames().then(() => { // if the names are valid
        form.submit(); // submit the form into the game.html page url
    }).catch(() => { // if the player names are not valid
        alert("Please enter valid names!!\nNames should be atleast 3 characters long, with maximum of 12 characters\nPlayer names also should not be identical");
        console.log("Please enter valid names");
    });


}