const generate_btn = document.getElementById('btn');
const input_field = document.getElementsByClassName('input--field')[0];
const copy = document.getElementById('copy');
const confirmation_msg = document.getElementById('copy-confirmation');  // Select the confirmation message

generate_btn.addEventListener('click', ()=>{
    const num = prompt("Enter the length of password")
    let password = generatePassword(num);
    input_field.value = password;
    console.log(password);
})

copy.addEventListener('click', ()=>{
    if(input_field.value.length > 0){
        window.navigator.clipboard.writeText(input_field.value);
        confirmation_msg.style.display = 'block';
        setTimeout(() => {
            confirmation_msg.style.display = 'none';
        }, 2000);
    }
})

function generatePassword(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    
    return password;
}
