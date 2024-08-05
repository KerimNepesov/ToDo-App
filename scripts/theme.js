document.querySelector('.toggle-btn').addEventListener('click',() => { 
    const changeTheme = color => document.body.setAttribute('data-theme',color)
    
    switch (document.body.getAttribute('data-theme')) {
        case 'light':
            changeTheme('dark')
            localStorage.setItem('curTheme', 'dark')
            break;
         case 'dark':
            changeTheme('light')
            localStorage.setItem('curTheme', 'light')
        break;
    }
})


const bodyTheme = document.querySelector('.body')
let activeTheme = localStorage.getItem('curTheme') ? localStorage.getItem('curTheme') : 'light'


const setTheme = (() => {
    if (activeTheme === 'light') bodyTheme.setAttribute('data-theme','light') 
    else bodyTheme.setAttribute('data-theme','dark')
    console.log(bodyTheme.data);
})()