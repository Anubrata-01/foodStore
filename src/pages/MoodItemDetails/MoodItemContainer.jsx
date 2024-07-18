import React, { useEffect, } from 'react';
import { useParams,} from 'react-router-dom';
import useMoodItemsData from '../../hooks/useMoodItemsData';
import ItemsDetailsContainer from './ItemsDetailsContainer';
import { useAtom } from 'jotai';
import { moodDataAtom, userIdAtom } from '../../storeAtom/Atom';
import ShimmerEffect from '../../utilities/ShimmerEffect';
import { ShimmerCol } from '../../utilities/shimmerr';

const MoodItemContainer = () => {
  const { userId } = useParams(); 
  const [, setUserId] = useAtom(userIdAtom);
  const [, setMoodData] = useAtom(moodDataAtom);
  const [moodData] = useAtom(moodDataAtom);

  useMoodItemsData(userId);
  useEffect(() => {
    setUserId(userId);
  }, [userId, setUserId]);
  if(!moodData) return <ShimmerEffect/>
 console.log(moodData);

  return (
    <div>
      <ItemsDetailsContainer Mooddata={moodData}/>
    </div>
  );
};

export default React.memo(MoodItemContainer);

