// import React, { useState } from 'react';
// import { Button, Collapse } from 'antd';

// const { Panel } = Collapse;

// const CollapsiblePanel = () => {
//   const [isOpen] = useState(false);

//   return (
//     <div>
//       <Collapse activeKey={isOpen ? 'test' : undefined}>
//         <Panel header="" key={'test'}>
//           <div>Some data goes here.</div>
//         </Panel>
//       </Collapse>
//     </div>
//   );
// };

// export default CollapsiblePanel;

import { Collapse } from 'antd';
import './Test.scss';
const { Panel } = Collapse;

const CollapsiblePanel = () => {
  return (
    <div className="collapse-container">
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Header 1" key="1">
          <div>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
              <li>Link 5</li>
            </ul>
          </div>
        </Panel>
        <Panel header="Header 2" key="2">
          <div>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
              <li>Link 5</li>
            </ul>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CollapsiblePanel;
