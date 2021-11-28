import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// 이렇게 메소드를 정의해준다.
// 이것은 props를 미리 준비해준다.
// 실행이 된다면 Next.js가 이 getStaticProps가 먼저 실행이 되고
// return 되는 Props를 HomePage에 넘겨준다음
// HomePage가 render되는 것이라고 생각하면 된다.
// build 될 때 이러한 과정이 생긴다 라는 것인가?
// 그럼 완전히 다이나믹한 부분은 이렇게 build되어서 나가면 안되고
// React 처럼 그떄그떄마다 인터랙션을 해야 할 것 같은데
// 이 부분은 나중에 참고하도록 하자.

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
