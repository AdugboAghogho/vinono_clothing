// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { runFireworks, useStateContext } from "../../../lib/utils";
// import { BadgeCheck } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Success = () => {
//   useEffect(() => {
//     localStorage.clear();
//     setCartItems([]);
//     setTotalPrice(0);
//     setTotalQuantities(0);
//     runFireworks();
//   }, []);

//   return (
//     <div className="success-wrapper">
//       <div className="success">
//         <p className="icon">
//           <BadgeCheck />
//         </p>
//         <h2>Thank you for your order!</h2>
//         <p className="email-msg">Check your email inbox for the receipt.</p>
//         <p className="description">
//           If you have any questions, please email
//           <a className="email" href="mailto:order@example.com">
//             order@example.com
//           </a>
//         </p>
//         <Link href="/">
//           <Button type="button" width="300px" className="btn">
//             Continue Shopping
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Success;

import React from "react";

const Success = () => {
  return (
    <div>
      <h2>Success</h2>
    </div>
  );
};

export default Success;
