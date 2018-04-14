import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
const Chart = (props) => {
	const data = {
		labels: [
			'Yes', 'No'
		],
		datasets: [
			{
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: props.data
			}
		]
	};
	return (<HorizontalBar data={data} options={{
			legend: {
				display: false
			},
			scaleShowGridLines: false,
			scales: {
				xAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				]
			}
		}} width={600} height={50}/>)
}
export default Chart;
