import React from 'react';
import { motion } from 'framer-motion';

const Points = ({ points }) => {
  return (
    <>
      {points && (
        <motion.div
          className="points"
          initial={{ scale: 0 }}
          animate={{ scale: [null, 1.2, 0] }}
          transition={{ duration: 1.7, times: [0, 0.4, 1], type: "ease-out" }}
        >
          +{points}
        </motion.div>
      )}
    </>
  );
};

export default Points;
