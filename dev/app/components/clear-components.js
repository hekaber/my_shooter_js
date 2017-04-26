// this function clears all the components except the shooter

export function clearComponents(){
  let scoreChartContent = document.getElementById('scorechart_display');
  let aboutContent = document.getElementById('about_display');
  if(scoreChartContent){
    scoreChartContent.parentNode.removeChild(scoreChartContent);
  }
  if(aboutContent){
    aboutContent.parentNode.removeChild(aboutContent);
  }
}
