import { of } from 'rxjs';


function ofOperator(dataObj: any = {}) {
  dataObj.text = `import {of} from 'rxjs';\n\n
const source = of('Hello rxjs');\n
source.subscribe(res => console.log(res));`;
  dataObj.source = of('Hello rxjs');
  dataObj.source.subscribe(res => {
    dataObj.res.push(res);
  });
}


export { ofOperator };


