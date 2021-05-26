
function tool(data) {
    let labels=['0501','0502','0503','0504','0505']
    let key=['Antibacterials','Antifungal','Antiviral','Antiprotozoal','Anthelminics']
    let datamap = new Map()
    for(let i=0;i<labels.length;i++){
        datamap.set(labels[i],0)
    }
    // console.log(data.bnf)
    for(let bnf of data.bnf){
        let code = bnf[0]
        let sub=code.substring(0,4)
        console.log(bnf[1])
        // console.log(code)
        if(datamap.get(sub)!=undefined){
            datamap.set(sub,datamap.get(sub)+bnf[1])
        }
        // break
    }
    let sum=0
    for(let code of labels){
        sum = sum + datamap.get(code)
    }
    let percentages=[]
    let index=0
    for(let code of labels){
        percentages[index] = datamap.get(code)/sum * 100
        index = index + 1
    }
    // console.log(percentages)
    return {labels:key,data:percentages}
}

function BarChart2()
{
    var barChart = new Object();

    // function to draw barchart
    barChart.drawChart = function(pctData, elementId)
    {

        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';

        var ctx = document.getElementById(elementId);
        var myBarChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: pctData.labels,
            datasets: [{
              label: "Items",
              backgroundColor: "#4e73df",
              hoverBackgroundColor: "#2e59d9",
              borderColor: "#4e73df",
              data: pctData.data,
            }],
          },
          options: {
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
              }
            },
            scales: {
              xAxes: [{
                type: 'category',
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                maxBarThickness: 25,
              }],
              yAxes: [{
                ticks: {
                  min: 0,
                  maxTicksLimit: 10,
                  padding: 10,
                    callback: function(value) {
                        return value + '%';
                    }
                },
                gridLines: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2]
                }
              }],
            },
            legend: {
              display: false
            },
            tooltips: {
              titleMarginBottom: 10,
              titleFontColor: '#6e707e',
              titleFontSize: 14,
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
              callbacks: {
                label: function(tooltipItem, chart) {
                  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                  return datasetLabel + ': ' + tooltipItem.yLabel + '%';
                }
              }
            },
          }
        });
    }

    return barChart;
}