
import { useSpring, animated } from '@react-spring/web'
import { calculateNewValue } from '@testing-library/user-event/dist/utils'
import { SkeletonHelper } from 'three'


export default function Popup({springs,name}){


    

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
      >

     <p>Model {name} has been successfully saved 😊</p>
      </animated.div>)
}