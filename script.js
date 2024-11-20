document.addEventListener('DOMContentLoaded', function () {
    // Sample URL for real-life open-source data (e.g., U.S. Census data)
    const dataUrl = 'https://api.example.com/data'; // Replace with a real API endpoint
  
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        const categories = [...new Set(data.map(item => item.category))]; // Extract categories from data
        populateFilter(categories); // Populate filter dropdown dynamically
  
        const filterSelect = document.getElementById('filter');
        filterSelect.addEventListener('change', function () {
          const selectedCategory = filterSelect.value;
          updateScatterPlot(selectedCategory, data);
        });
  
        updateScatterPlot('all', data); // Initial plot with all data
      })
      .catch(error => console.error('Error fetching data:', error));
  
    // Populate filter dropdown dynamically based on categories in the data
    function populateFilter(categories) {
      const filterSelect = document.getElementById('filter');
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterSelect.appendChild(option);
      });
    }
  
    function updateScatterPlot(category, data) {
      let filteredData = data;
      if (category !== 'all') {
        filteredData = data.filter(item => item.category === category);
      }
  
      const trace = {
        x: filteredData.map(item => item.x),
        y: filteredData.map(item => item.y),
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: 12,
          color: filteredData.map(item => item.category === 'Urban' ? 'blue' : 'green'),
          opacity: 0.7,
          line: { width: 1, color: 'rgb(50,50,50)' },
        },
        text: filteredData.map(item => `Category: ${item.category}`),
        hoverinfo: 'text',
      };
  
      const layout = {
        title: 'Scatter Plot with Data Filtering',
        xaxis: { title: 'X Axis (e.g., Income)' },
        yaxis: { title: 'Y Axis (e.g., Education Level)' },
        showlegend: false,
        plot_bgcolor: '#f7f7f7',
        paper_bgcolor: '#ffffff',
        font: { color: '#333' },
      };
  
      Plotly.newPlot('scatter-plot', [trace], layout);
    }
  });
  