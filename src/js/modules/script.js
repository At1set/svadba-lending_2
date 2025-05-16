window.onload = () => {
  const form = document.querySelector(".registration-form")
  const nameInput = document.getElementById("name")
  const surnameInput = document.getElementById("surname")
  const radioInputs = form.querySelectorAll('input[name="visit"]')

  form.addEventListener("submit", async function (e) {
    e.preventDefault()

    let valid = true

    // Очистка ошибок
    clearError()
    radioInputs.forEach((r) => r.parentElement.classList.remove("btn--error"))
    const choosed_alcohol = getAlcoholNames()

    // Валидация полей
    if (nameInput.value.trim().length < 3) {
      showError("Пожалуйста, введите ваше имя")
      valid = false
    } else if (surnameInput.value.trim().length < 3) {
      showError("Пожалуйста, введите вашу фамилию")
      valid = false
    } else if (!choosed_alcohol.length) {
      showError("Пожалуйста, выберите алкоголь, который вы предпочитаете")
      valid = false
    }

    let selected = [...radioInputs].find((r) => r.checked)
    if (!selected && valid) {
      radioInputs.forEach((r) => r.parentElement.classList.add("btn--error"))
      valid = false
      showError("Пожалуйста, укажите, сможете ли вы прийти")
    }

    if (!valid) return

    form.classList.add("form--loading")

    const text = `<b>Новый ответ на приглашение:</b>%0A<b>Имя:</b> ${nameInput.value.trim()}%0A<b>Фамилия:</b> ${surnameInput.value.trim()}%0A<b>Алкоголь:</b> ${choosed_alcohol.join(
      ", "
    )}%0A<b>${selected.id === "will-go" ? "Смогу" : "Не смогу"}</b>`

    try {
      // await fetch(`https://your-api-or-telegram-bot-link?text=${text}`)
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Заглушка
      form.innerHTML = `<div class="registration-form__result-message title-italic">
          <p>Спасибо за ваш ответ</p>
          <span>${selected.id === "will-go" ? "Буду" : "Не смогу"}</span>
        </div>`
      console.log(text)
    } catch (error) {
      console.error(error)
      form.innerHTML = "<p>Произошла ошибка. Попробуйте позже.</p>"
    } finally {
      form.classList.remove("form--loading")
    }
  })

  // Функции для показа / очистки ошибок
  function showError(message) {
    const errorBlock = document.querySelector(".form-input__error")
    if (errorBlock) {
      errorBlock.textContent = message
    }
  }

  function clearError() {
    const errorBlock = document.querySelector(".form-input__error")
    if (errorBlock) {
      errorBlock.textContent = ""
    }
  }

  // Сброс ошибки при вводе
  ;[nameInput, surnameInput].forEach((input) => {
    input.addEventListener("input", () => clearError())
  })

  // ====== Выбор алкоголя ======= //
  const alcoholMenu = document.querySelector(".modal-window")
  const openAlcoholMenuButton = document.getElementById("open-alcoholMenu")
  const closeAlcoholMenuButton = document.getElementById("close-alcoholMenu")

  openAlcoholMenuButton.onclick = (e) => {
    e.preventDefault()
    alcoholMenu.classList.add("_active")
  }
  closeAlcoholMenuButton.onclick = (e) => {
    e.preventDefault()
    alcoholMenu.classList.remove("_active")
  }
  alcoholMenu.addEventListener("change", (e) => {
    const checked = getCheckedAlcoholCheckboxes()
    // Если пользователь пытается поставить 4-й чекбокс
    if (checked.length > 3) {
      e.target.checked = false // отменяем выбор
    }
  })

  function getCheckedAlcoholCheckboxes() {
    const checkboxes = alcoholMenu.querySelectorAll(
      'input[type="checkbox"][name="aclohol"]'
    )
    const checked = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    )
    return checked
  }

  function getAlcoholNames() {
    const checked_checkboxes = getCheckedAlcoholCheckboxes()
    if (!checked_checkboxes.length) return []

    const names = checked_checkboxes.map((cb) => {
      const option = cb.closest(".alcohol-option")
      const title = option.querySelector("h3")
      return title ? title.textContent.trim() : ""
    })

    return names
  }

  // Анимация при скролле
  const animItems = document.querySelectorAll("[data-anim-on-scroll]")

  animItems.forEach((animItem) => {
    const datasetValue = animItem.dataset.animOnScroll || "0"
    let offsetPx = 0
    let isSingle = false

    if (datasetValue.includes(",")) {
      const [offsetPart, mode] = datasetValue.split(",")
      offsetPx = parseInt(offsetPart.trim(), 10)
      isSingle = mode.trim() === "single"
    } else {
      offsetPx = parseInt(datasetValue.trim(), 10)
    }

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        const data_delay = parseInt(animItem.dataset.animDelay?.trim(), 10)
        const delay = Number.isNaN(data_delay) ? 0 : data_delay
        if (entry.isIntersecting) {
          setTimeout(() => {
            animItem.classList.add("_anim")
          }, delay || 0)
          if (isSingle) {
            obs.unobserve(animItem)
          }
        } else {
          if (!isSingle) {
            setTimeout(() => {
              animItem.classList.remove("_anim")
            }, delay || 0)
          }
        }
      },
      {
        root: null,
        rootMargin: `${offsetPx * -1}px 0px`, // Важно: инвертируем знак!
        threshold: 0,
      }
    )

    observer.observe(animItem)
  })
}
