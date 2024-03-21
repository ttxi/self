import { useState } from 'react';

const Row = ({ index, style, forwardRef }) => {
  return (
    <div
      className={index % 2 ? 'list-item-odd' : 'list-item-even'}
      style={style}
      ref={forwardRef}
    >
      {`Row ${index}`}
    </div>
  );
};

function App() {
  return (
    <FixedSizeList
      className="list"
      height={200}
      width={200}
      itemSize={50}
      itemCount={1000}
    >
      {Row}
    </FixedSizeList>
  );
}
export default App;

function FixedSizeList(props) {
  const { height, width, itemSize, itemCount, children: Child } = props;

  // 记录滚动掉的高度
  const [scrollOffset, setScrollOffset] = useState(0);

  const containerStyle = {
    position: 'relative',
    width,
    height,
    overflow: 'auto',
    border: '1px solid #efefef',
  };

  // 1000个元素撑起盒子的实际高度
  const contentStyle = {
    height: itemSize * itemCount,
    width: '100%',
    background: '#f0f0f0f0',
  };

  const scrollFn = (e) => {
    const { scrollTop } = e.currentTarget;
    console.log(scrollTop);
    setScrollOffset(scrollTop);
  };

  const getCueentChildren = () => {
    // 可视区域开始索引
    const startIndex = Math.floor(scrollOffset / itemSize);
    // 上缓冲区起始索引
    const startCachedIndex = Math.max(0, startIndex - 2);
    // 可视区能展示的元素的最大个数
    const visibleCount = Math.ceil(height / itemSize);
    // 下缓冲区结束索引
    const endCachedIndex = Math.min(itemCount, startIndex + visibleCount + 2);
    const items = [];
    // 根据上面计算的索引值，不断添加元素给container
    for (let i = startCachedIndex; i < endCachedIndex; i++) {
      const itemStyle = {
        position: 'absolute',
        height: itemSize,
        width: '100%',
        borderBottom: '1px solid red',
        // 计算每个元素在container中的top值
        top: itemSize * i,
      };
      items.push(<Child key={i} index={i} style={itemStyle} />);
    }
    return items;
  };

  return (
    <div style={containerStyle} onScroll={scrollFn}>
      <div style={contentStyle}>{getCueentChildren()}</div>
    </div>
  );
}
