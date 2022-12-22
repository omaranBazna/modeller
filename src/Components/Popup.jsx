
import { useSpring, animated } from '@react-spring/web'
import { calculateNewValue } from '@testing-library/user-event/dist/utils'
import { SkeletonHelper } from 'three'


export default function Popup({message}){

    const springs = useSpring({
        from: { y: -10 ,  opacity:0},
        to:async (next, cancel) => {
        await next({ y: -60 ,  opacity:0})
        await next({ y: 60 ,  opacity:0.8})
        var start = new Date().getTime();
        while (new Date().getTime() < start +500);
        await next({ y: -60 ,  opacity:0})

      },
       
        delay:200
      })
    

    return (<animated.div className="popup"
        style={{
          width: 200,
          height: 80,
          background: '#ffe100',
          borderRadius: 8,
          position:'absolute',
          zIndex:999,
          ...springs,
        }}
      />)
}