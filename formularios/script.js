const fields = document.querySelectorAll("[required]") // Todos elementos que tiverem required

function validateField(field) {

    function verifyErrors() {
        let foundError = false;

        for (let error in field.validity) { // Cada erro dentro do array field.validity
            if ( field.validity[error] && !field.validity.valid ) { // Se o erro existir e o campo não for válido
                foundError = error // Erro encontrado
            }
        }

        return foundError // Retorna o erro
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                "valueMissing": "Por favor, preencha este campo!"
            },
            email: {
                "valueMissing": "Por favor, preencha este campo!",
                "typeMismatch": "Insira um email válido"
            }
                
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message

        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function () {
        const error = verifyErrors()

        if (error) {
            setCustomMessage(customMessage(error))

        } else {
            setCustomMessage()
        }

    }
}

function customValidation(event) {

    const field = event.target // Quem disparou o evento
    const validation = validateField(field)
    const error = validateField(field)
    
    validation()
}

for (let field of fields) { // Para cada field dentro dos fields
    console.log(field.validity)
    field.addEventListener("invalid", event => { // Adiciona um evento invalid para field e chama função customValidation

        event.preventDefault() // Elimina o bubble

        customValidation(event)
    }) 

    field.addEventListener("blur", customValidation) // Adiciona um evento quando desfocado e chama função customValidation
}

document.querySelector("form")
    .addEventListener("submit", (event) => {
        console.log("Enviar formulário")
        event.preventDefault() // Não vai enviar o formulário
    }) // No seletor "form" adicione um evendo submit que quando true seguira a função declarada