import { useState } from 'react';
import { Motion } from 'tttt';

const App = () => {
  const [show, setshow] = useState(false);
  const onTrigger = (e) => {
    setshow(e.target.checked);
  };
  return (
    <div>
      <label>
        <input type="checkbox" onChange={onTrigger} checked={show} /> Show
        Component
      </label>

      <Motion visible={show}>
        {(props, ref) => (
          <div {...props} ref={ref}>
            1
          </div>
        )}
      </Motion>
    </div>
  );
};
export default App;

