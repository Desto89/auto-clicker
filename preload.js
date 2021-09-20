const {ipcRenderer} = require('electron')
var robot = require("kbm-robot");

let isWorking = false
window.addEventListener('DOMContentLoaded', () => {
    robot.startJar();
    function robotjar() {
            robot.press(document.getElementById('input').value)
            .sleep(50)
            .release(document.getElementById('input').value)
            .go()
            return
    }
    
    function clicking() {
        let randomInt = Math.floor(Math.random() * 3) * 500
        if (isWorking) {
            robotjar()
        }
        
        if (document.getElementById('checkbox').checked === true) {
            setTimeout(() => {
                clicking()
            }, randomInt) 
        } else {
            setTimeout(() => {
                clicking()
            }, document.getElementById('number-input').value * 500) 
        }
    }

    clicking()

    ipcRenderer.on('send', function(event) {
        if (isWorking === false) {
            isWorking = true
        } else {
            isWorking = false
        }
    })

    document.getElementById('number-input').addEventListener('change', () => {
        if (document.getElementById('number-input').value < 0) {
            document.getElementById('number-input').value = 0
        }
    })
    document.getElementById('checkbox').addEventListener('change',function() {
        if (document.getElementById('checkbox').checked) {
            document.getElementById('number-input').disabled = true
        } else {
            document.getElementById('number-input').disabled = false
        }
    })

})

