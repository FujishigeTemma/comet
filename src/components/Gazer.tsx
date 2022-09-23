import webgazer from 'webgazer'

export const Gazer = () => {
  webgazer.setGazeListener((data, elapsedTime: number) => {
    if (data == null) {
      return;
    }
    var xprediction = data.x;
    var yprediction = data.y;
    console.log(xprediction, yprediction, elapsedTime);
  }).begin();

  var prediction = webgazer.getCurrentPrediction();
  var x = prediction.x;
  var y = prediction.y;

  return (
    <div className="flex justify-center py-8">
      <div className="max-w-3xl">
        <h1>Gazer</h1>
        {prediction && <p>{x}, {y}</p>}
      </div>
    </div>
  )
}
