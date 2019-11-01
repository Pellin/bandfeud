import React from 'react';
import { motion } from 'framer-motion';

const Points = ({ points }) => {
  return (
    <>
      {points && (
        <motion.div
          className="points"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: [null, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.7, 1] }}
        >
          +{points}
        </motion.div>
      )}
    </>
  );
};

export default Points;
