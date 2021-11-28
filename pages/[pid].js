import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { products } = props;
  return (
    <Fragment>
      <h1>TITLE</h1>
      <p>DESCRIPTION</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // context 라는 것을 통해서 url의 params 정보를 얻을 수 있다는 것이다.
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id == productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    //   이렇게 path를 정해주는 이유는 이것도 결국 build될 떄
    //   페이지를 리턴하게 만들어야 하는데 pid라는 것은 사실 동적이다.
    //   그렇기 때문에 nextjs의 입장에서는 pid가 몇개나 존재하는지 모른다.
    //   그것에 대한 정보를 미리 알려주는 것이고
    //   이 path에 의해서 context로 넘어가는 것이라고 생각하면 될 것 같다.
    //   근데 만약에 엄청나게 많은 pid가 존재한다면은 어쩔꺼임?
    //   그럴때는 react가 하는 것 처럼, 그떄그때마다 요청하는 식으로 가야 할 것 같은데
    //   나중에 어떻게 해결하는지를 보자.
    //   build를 해보면은 알겠지만, p1.json 뭐 이런것이 생긴다.
    //   미리 그 데이터를 다 load하기 떄문에 request를 날릴 이유가 없는 것임.
    paths: [
      {
        params: { pid: "p1" },
      },
      {
        params: { pid: "p2" },
      },
      {
        params: { pid: "p3" },
      },
    ],
    // 이렇게 fallback을 false로 하면은 pre generated 하게 만드는 것이라고
    // 하는 것 같다.
    fallback: false,
  };
}

export default ProjectDetailPage;
