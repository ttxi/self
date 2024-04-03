import './index.less';

import { Input, Select } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;
const ExplainInput = () => {
  const [workFlow, setWorkFlow] = useState('啊啊啊啊');
  return (
    <div className="inputBox explainInput">
      <div className="textAreaGlobal showWorkFlow">
        {workFlow && (
          <div className="workFlowInput">
            啊啊啊啊
            <div
              className="close"
              onClick={() => {
                setWorkFlow(null);
              }}
            ></div>
          </div>
        )}

        <TextArea
          className={'textarea'}
          placeholder="请提出你的想法"
          autoSize={{ maxRows: 6 }}
        />
        <div className="footer">
          <Select
            className="select"
            placeholder="请选择知识库"
            defaultValue="lucy"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
            ]}
          />
          <div className="submit"></div>
        </div>
      </div>
    </div>
  );
};
export default ExplainInput;
