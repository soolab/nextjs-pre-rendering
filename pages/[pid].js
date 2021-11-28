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

export default ProjectDetailPage;
