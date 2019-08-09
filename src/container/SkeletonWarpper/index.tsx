// import './index.scss'

// import Loading from '@components/Loading'
// import { PageCompExt } from '@lib/extent/comp'
// import { View } from '@tarojs/components'

// import { allEnhancer } from '@decorators'

// type Props = {
//   theme?: 'dark' | 'light'
// }

// @allEnhancer
// class SkeletonWarpper extends PageCompExt<Props> {
//   static defaultProps = { theme: 'light' }

//   render() {
//     const {
//       viewStore: { showSkeleton },
//       theme,
//     } = this.props
//     return (
//       <View className="warpper">
//         <View className={`curtain ${showSkeleton ? '' : 'hide'} ${theme}`}>
//           <View className="loader">
//             <Loading />
//           </View>
//         </View>

//         {this.props.children}
//       </View>
//     )
//   }
// }

// export default SkeletonWarpper
