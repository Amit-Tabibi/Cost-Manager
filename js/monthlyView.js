/*
* Amit Tabibi - 211821368
* David Daida - 313374373
*/

$(document).ready(function() {

    $(".dropdown-menu li a").click(function () {
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));

        let selectedMonth;
        let currentMonth = new Date().getMonth();
        let selectedYear = Number($('#dropdownMenu1').val()) || '2023';

        function generateMonthlyRecords(monthNumber, year) {
            return JSON.parse(localStorage.getItem("expenses")).filter(function (elem) {
                return (new Date(elem[0]).getMonth()) === monthNumber && (new Date(elem[0]).getFullYear()) === year
            });
        }

        function printMonthlyRecords(month, monthRecords) {
            selectedMonth = month;
            $('#monthName').addClass('alert').addClass('alert-success').text("Here are your expenses for the month of " + month + " ...");
            $('#monthExpenseTable tbody').text('');
            monthRecords.forEach(function (elem, i) {
                $("#monthExpenseTable").append('<tr><th scope="row">' + i + '</th><td data-th="Date">' + elem[0] + '</td><td data-th="Amount">' + elem[1] + '</td><td data-th="Category">' + elem[4] + '</td><td data-th="More info">' + elem[2] + '</td><td data-th="comments">' + elem[3] + '</td></tr>');
            })
        }

        function moneySpentOnACategoryPerMonth(monthNumber,year, category) {
            let store = JSON.parse(localStorage.getItem("expenses")).filter(function (elem) {
                return (new Date(elem[0]).getMonth()) === monthNumber && (new Date(elem[0]).getFullYear()) === year
            }).filter(function (el) {
                return el[4] === category
            }).map(function (money) {
                return Number(money[1])
            })

            return store.length >= 1 ? store.reduce(function (prev, cur) { return prev + cur }) : store
        }
        console.log(moneySpentOnACategoryPerMonth(1, "Entertainment "))

        // for getting records for that particular month
        // 0 - january to 11 - december

        const januaryRecords = generateMonthlyRecords(0, selectedYear);
        const februaryRecords = generateMonthlyRecords(1, selectedYear);
        const marchRecords = generateMonthlyRecords(2, selectedYear);
        const aprilRecords = generateMonthlyRecords(3, selectedYear);
        const mayRecords = generateMonthlyRecords(4, selectedYear);
        const juneRecords = generateMonthlyRecords(5, selectedYear);
        const julyRecords = generateMonthlyRecords(6, selectedYear);
        const augustRecords = generateMonthlyRecords(7, selectedYear);
        const septemberRecords = generateMonthlyRecords(8, selectedYear);
        const octoberRecords = generateMonthlyRecords(9, selectedYear);
        const novemberRecords = generateMonthlyRecords(10, selectedYear);
        const decemberRecords = generateMonthlyRecords(11, selectedYear);


        const config = {
            type: "doughnut",
            data: {
                "labels": ["Automobile", "Clothing", "Entertainment", "Food", "Healthcare", "Vacation"],
                "datasets": [{
                    "label": "My First Dataset",
                    "data": "",
                    "backgroundColor": ["#F17D80", "#737495", "#68A8AD", "#C4D4AF", "#6C8672", "#775BA3"]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: ''
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        function paintMonthlyChart(month,year) {
            // destroy old chart first inorder to stop fickerinf of chart with previous data
            window.myDoughnut !== undefined ? window.myDoughnut.destroy() : window.myDoughnut;

            let ctx = document.getElementById("this-month-expenses-on-category").getContext("2d");
            donutChartData = [moneySpentOnACategoryPerMonth(month, year, "Automobile "), moneySpentOnACategoryPerMonth(month, year, "Clothing "), moneySpentOnACategoryPerMonth(month, year, "Entertainment "), moneySpentOnACategoryPerMonth(month, year, "Food "), moneySpentOnACategoryPerMonth(month, year, "Healthcare "), moneySpentOnACategoryPerMonth(month, year, "Vacation ")]
            config.data.datasets[0].data = donutChartData
            window.myDoughnut = new Chart(ctx, config);
        }


        $('#month-jan').on('click', function () {
            printMonthlyRecords('January', januaryRecords)
            paintMonthlyChart(0, selectedYear)

        })

        $('#month-feb').on('click', function () {
            printMonthlyRecords('February', februaryRecords)
            paintMonthlyChart(1, selectedYear)
        })

        $('#month-mar').on('click', function () {
            printMonthlyRecords('March', marchRecords)
            paintMonthlyChart(2, selectedYear)

        })

        $('#month-apr').on('click', function () {
            printMonthlyRecords('April', aprilRecords)
            paintMonthlyChart(3, selectedYear)

        })

        $('#month-may').on('click', function () {
            printMonthlyRecords('May', mayRecords)
            paintMonthlyChart(4, selectedYear)

        })

        $('#month-jun').on('click', function () {
            printMonthlyRecords('June', juneRecords)
            paintMonthlyChart(5, selectedYear)

        })

        $('#month-jul').on('click', function () {
            printMonthlyRecords('July', julyRecords)
            paintMonthlyChart(6, selectedYear)

        })

        $('#month-aug').on('click', function () {
            printMonthlyRecords('August', augustRecords)
            paintMonthlyChart(7, selectedYear)

        })

        $('#month-sep').on('click', function () {
            printMonthlyRecords('September', septemberRecords)
            paintMonthlyChart(8, selectedYear)

        })

        $('#month-oct').on('click', function () {
            printMonthlyRecords('October', octoberRecords)
            paintMonthlyChart(9, selectedYear)

        })

        $('#month-nov').on('click', function () {
            printMonthlyRecords('November', novemberRecords)
            paintMonthlyChart(10, selectedYear)

        })

        $('#month-dec').on('click', function () {
            printMonthlyRecords('December', decemberRecords)
            paintMonthlyChart(11, selectedYear)

        })

    });
    
})

