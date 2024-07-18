// import React from 'react'
import "./shimmer.css"
// const ShimmerEffect = () => {
//   return (
//     <div className="loader">
//     <div className="bar1"></div>
//     <div className="bar2"></div>
//     <div className="bar3"></div>
//     <div className="bar4"></div>
//     <div className="bar5"></div>
//     <div className="bar6"></div>
//     <div className="bar7"></div>
//     <div className="bar8"></div>
//     <div className="bar9"></div>
//     <div className="bar10"></div>
//     <div className="bar11"></div>
//     <div className="bar12"></div>
// </div>
//   )
// }

// export default ShimmerEffect




const ShimmerEffect = () => {
  return (
		<div>
			<div className="main-home-shimmer">
				<div className="outer_circle">
					<div className="inner_circle">
						<i className="fa-solid fa-pizza-slice fa-fade"></i>
					</div>
				</div>
				<h2>Looking for great food near you ...</h2>
			</div>

			<div className="body-box-res body-box">
				<div className="main-header-box">
					<div className="box-shimmer big-header-home"></div>
					<div className="main-header-filter">
						{Array(5)
							.fill("")
							.map((elem, idx) => {
								return (
									<button
										className="shimmer-fbtn"
										key={"shim-fil" + idx}
									></button>
								);
							})}
					</div>
					<div className="main-card">
						{Array(8)
							.fill("")
							.map((elem, idx) => {
								return (
									<div
										className="shimmer card"
										key={"shimmer-menu" + idx}
									>
										<div className="img-box img-shimmer"></div>
										<div className="box-shimmer big-shimmer"></div>
										<div className="box-shimmer"></div>
										<div className="box-shimmer"></div>
										<div className="box-shimmer"></div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ShimmerEffect;