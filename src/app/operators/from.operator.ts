import {from} from 'rxjs';


function fromOperator(dataObj: any = {}) {
  dataObj.text = `import {from} from 'rxjs';\n\n
const source = from('Hello rxjs');\n
source.subscribe(res => console.log(res));`;
  dataObj.source = from('Hello rxjs');
  dataObj.source.subscribe(res => {
    dataObj.res.push(res);
  });
}


export {fromOperator};


