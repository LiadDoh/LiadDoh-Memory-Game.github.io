function checkPlayerNames() {
    return new Promise((resolve, reject) => {
        let p1 = document.getElementById("player1").value;
        let p2 = document.getElementById("player2").value;
        console.log(p1);
        console.log(p2);
        if (p1.length > 2 && p2.length > 2 && p1 !== p2 && p1.length <= 12 && p2.length <= 12) {
            resolve();
        } else {
            console
            reject();
        }
    });
}

async function checkForm(form) {
    await checkPlayerNames().then(() => {
        form.submit();
        // window.location.href = "./game.html";
    }).catch(() => {
        alert("Please enter valid names!!\nNames should be atleast 3 characters long, with maximum of 12 characters\nPlayer names also should not be identical");
        console.log("Please enter valid names");
    });


}