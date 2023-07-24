const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const selectedDiv = document.getElementById('year');
        const selectedDiv1 = document.getElementById('month');
        const selectedDiv2 = document.getElementById('day');
        const selectedDiv3 = document.getElementById('month1');
        const selectedDiv4 = document.getElementById('day1');
        const selectedDiv5 = document.getElementById('hours');
        const selectedDiv6 = document.getElementById('minutes');
        const selectedDiv7 = document.getElementById('seconds');
        const op = document.getElementById('m_d');
        const op1 = document.getElementById('n_b');

        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth() + 1;
        let currentDate = new Date().getDate();

        if (currentDate < 10) {
            currentDate = "0" + currentDate;
        }
        if (currentMonth < 10) {
            currentMonth = "0" + currentMonth;
        }

        document.getElementById('today_date').value = currentYear + "-" + currentMonth + "-" + currentDate;

        // Función para mostrar el modal con la información calculada
        function showModal(birthYear, birthMonth, birthDate, nextBirthMonth, nextBirthDate) {
            var modal = document.querySelector(".age_main_big_container");
            modal.style.display = "block";

            // Mostrar los valores de la edad calculada en el modal
            document.getElementById('year').innerText = birthYear;
            document.getElementById('month').innerText = birthMonth;
            document.getElementById('day').innerText = birthDate;
            document.getElementById('month1').innerText = nextBirthMonth;
            document.getElementById('day1').innerText = nextBirthDate;
        }

        // Función para cerrar el modal
        function closeModal() {
            var modal = document.querySelector(".age_main_big_container");
            modal.style.display = "none";
        }

        // Función para calcular la cuenta regresiva para el próximo cumpleaños
        function calculateCountdown(nextBirthday) {
            const oneSecond = 1000;
            const oneMinute = oneSecond * 60;
            const oneHour = oneMinute * 60;
            const oneDay = oneHour * 24;
            const today = new Date();
            const timeLeft = nextBirthday - today;
            const days = Math.floor(timeLeft / oneDay);
            const hours = Math.floor((timeLeft % oneDay) / oneHour);
            const minutes = Math.floor((timeLeft % oneHour) / oneMinute);
            const seconds = Math.floor((timeLeft % oneMinute) / oneSecond);

            // Mostrar los valores de la cuenta regresiva en los elementos HTML
            selectedDiv4.innerText = days;
            selectedDiv5.innerText = hours;
            selectedDiv6.innerText = minutes;
            selectedDiv7.innerText = seconds;
        }

        // Función para calcular la edad a partir de la fecha de nacimiento ingresada
        function ageCalculate() {
            let myBirth = document.getElementById("date").value;
            let today = new Date();
            let currentYear = today.getFullYear();
            let currentMonth = today.getMonth() + 1;
            let currentDate = today.getDate();

            if (myBirth != "") {
                let inputDate = new Date(myBirth);
                let birthMonth, birthDate, birthYear;
                let birthDetails = { date: inputDate.getDate(), month: inputDate.getMonth() + 1, year: inputDate.getFullYear() }

                if (currentYear % 4 === 0 || (currentYear % 100 === 0 && currentYear % 400 === 0)) {
                    months[1] = 29;
                } else {
                    months[1] = 28;
                }

                birthYear = currentYear - birthDetails.year;
                if (currentMonth >= birthDetails.month) {
                    birthMonth = currentMonth - birthDetails.month;
                } else {
                    birthYear--;
                    birthMonth = 12 + currentMonth - birthDetails.month;
                }

                if (currentDate >= birthDetails.date) {
                    birthDate = currentDate - birthDetails.date;
                } else {
                    birthMonth--;
                    let days = months[currentMonth - 2];
                    birthDate = days + currentDate - birthDetails.date;
                    if (birthMonth < 0) {
                        birthMonth = 11;
                        birthYear--;
                    }
                }

                selectedDiv.innerText = birthYear;
                selectedDiv1.innerText = birthMonth;
                selectedDiv2.innerText = birthDate;
                op.style.opacity = '1';
                op1.style.opacity = '1';

                // Calcular el próximo cumpleaños
                const nextBirthday = new Date(today.getFullYear(), birthDetails.month - 1, birthDetails.date);
                if (nextBirthday < today) {
                    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                }

                // Mostrar la cuenta regresiva
                calculateCountdown(nextBirthday);

                // Llamar a la función para mostrar el modal y pasar los valores calculados como argumentos
                showModal(birthYear, birthMonth, birthDate, birthMonth === 0 ? 11 : 12 - birthMonth, months[currentMonth] - birthDate);

                // Actualizar la cuenta regresiva cada segundo
                setInterval(function () {
                    calculateCountdown(nextBirthday);
                }, 1000);
            }
        }

        // Obtener el botón "Cerrar" del modal y agregar el evento click
        var btnCerrar = document.querySelector(".close");
        btnCerrar.addEventListener("click", closeModal);

        // Cuando el usuario haga clic fuera del modal, cerrarlo
        window.onclick = function (event) {
            var modal = document.querySelector(".age_main_big_container");
            if (event.target == modal) {
                closeModal();
            }
        }