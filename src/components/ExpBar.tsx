import { motion } from 'framer-motion';

interface ExpBarProps {
  totalExp: number;
  maxExp: number;
}

const ExpBar = ({ totalExp, maxExp }: ExpBarProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Daily EXP Progress</span>
        <span className="text-sm font-medium text-gray-700">{totalExp} / {maxExp} EXP</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(totalExp / maxExp) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ExpBar;