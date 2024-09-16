import { Header } from '../components/Header';
import { LeftSide } from '../components/LeftSide';
import { RightSide } from '../components/RightSide';
import { ReadPost } from '../components/ReadPost';
import { useParams } from 'react-router-dom';

export function Posts() {
  const { post_title } = useParams();

  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex gap-4 p-2 justify-center">
        <LeftSide />
        <ReadPost post_title={post_title} />
        <RightSide />
      </div>
      <footer></footer>
    </div>
  );
}
