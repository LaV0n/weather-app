import d1 from '../../assets/image/01d.jpg'
import n1 from '../../assets/image/01n.jpg'
import d2 from '../../assets/image/02d.jpg'
import n2 from '../../assets/image/02n.jpg'
import d3 from '../../assets/image/03d.jpg'
import n3 from '../../assets/image/03n.jpg'
import d4 from '../../assets/image/04d.jpg'
import n4 from '../../assets/image/04n.jpg'
import d9 from '../../assets/image/09d.jpg'
import n9 from '../../assets/image/09n.jpg'
import d10 from '../../assets/image/10d.jpg'
import n10 from '../../assets/image/10n.jpg'
import d11 from '../../assets/image/11d.jpg'
import n11 from '../../assets/image/11n.jpg'
import d13 from '../../assets/image/13d.jpg'
import n13 from '../../assets/image/13n.jpg'
import d50 from '../../assets/image/50d.jpg'
import n50 from '../../assets/image/50n.jpg'

export const BackGroundSelector = (type: string) => {
   switch (type) {
      case '01d':
         return d1
      case '01n':
         return n1
      case '02d':
         return d2
      case '02n':
         return n2
      case '03d':
         return d3
      case '03n':
         return n3
      case '04d':
         return d4
      case '04n':
         return n4
      case '09d':
         return d9
      case '09n':
         return n9
      case '10d':
         return d10
      case '10n':
         return n10
      case '11d':
         return d11
      case '11n':
         return n11
      case '13d':
         return d13
      case '13n':
         return n13
      case '50d':
         return d50
      case '50n':
         return n50

      default:
         return d1
   }
}
