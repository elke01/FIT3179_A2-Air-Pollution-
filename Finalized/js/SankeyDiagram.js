google.charts.load('current', {'packages':['sankey']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
    // Fetch and parse the CSV data
    const response = await fetch('https://raw.githubusercontent.com/elke0001/FIT3179_Assignment2/refs/heads/main/Data/LULUCFsankey.csv');
    const csvText = await response.text();

    // Parse CSV data into a DataTable
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}}); // Tooltip column

    // Split CSV text into rows and process each row
    const rows = csvText.trim().split('\n').slice(1); // Remove header
    rows.forEach(row => {
        const [source, target, value] = row.split(',');
        // Add tooltip content (customize as needed)
        const tooltip = 
        `<div class="container">
        <div class="flow"><strong>${source}</strong> to <strong>${target}</strong></div>
        <div class="value">Value (Mt CO2eq): ${parseFloat(value).toFixed(2)}</div>
        </div>`;
        data.addRow([source, target, parseFloat(value), tooltip]); // Include tooltip in data
    });

    // Set chart options.
    const colors = [
        '#e41a1c',
        '#d2ff09',
        '#f781bf',
        '#984ea3',
        '#ffff33',
        '#33fff9',
        '#ff7f00',
        '#335bff',
        '#8c564b',
        '#fdae61',
        '#fc8d59',
        '#c51b7d',
        '#ffcc00',
        '#6a3d9a'
    ];

    var options = {
        height: 375,
        width: 500,
        tooltip: { isHtml: true }, 
        sankey: {
            node: {
                colors: colors,
                label: {
                    fontName: 'Arial',
                    fontSize: 15,
                    color: 'black',
                    bold: true
                },
                nodePadding: 18
            },
            link: {
                colorMode: 'gradient',
                colors: colors
            }
        }
    };

    // Instantiates and draws the chart, passing in the options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey'));
    chart.draw(data, options);
}
