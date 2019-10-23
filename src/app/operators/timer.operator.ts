import { timer } from 'rxjs';


function timerOperator(dataObj: any = {}) {
  dataObj.text = `import {timer} from 'rxjs';\n\n
const source = timer(3000, 1000);\n
source.subscribe(res => console.log(res)); // emit after 3 sec 1, 2, 3, 4... with interval 1s`;

  dataObj.res = ['Wait fo 3 sec...'];
  dataObj.source = timer(3000, 1000)
    .subscribe(res => {
      if (dataObj.res.indexOf('Wait fo 3 sec...') !== -1) {
        dataObj.res.splice(dataObj.res.indexOf('Wait fo 3 sec...'), 1);
      }
      dataObj.res.push(res);
      dataObj.res = [...dataObj.res];

    });
}

export { timerOperator };


