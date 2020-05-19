import {
  addProductToRows,
  getAssociationIdentifiers,
  isRowWithProduct,
  filterOnLabelOrIdentifier,
} from '../../../../Resources/public/js/product/form/quantified-associations/models/row';
import {ProductType} from '../../../../Resources/public/js/product/form/quantified-associations/models/product';

const productRow = {
  associationTypeCode: 'PACK',
  productType: ProductType.Product,
  quantity: 3,
  identifier: 'bag',
  product: null,
};

const productModelRow = {
  associationTypeCode: 'PACK',
  productType: ProductType.ProductModel,
  quantity: 17,
  identifier: 'braided-hat',
  product: null,
};

const product = {
  id: 1,
  identifier: 'bag',
  label: 'Nice bag',
  document_type: ProductType.Product,
  image: null,
  completeness: 100,
  variant_product_completenesses: null,
};

const productModel = {
  id: 2,
  identifier: 'braided-hat',
  label: 'Braided hat',
  document_type: ProductType.ProductModel,
  image: {filePath: '/some.jpg', originalFileName: 'some'},
  completeness: null,
  variant_product_completenesses: {
    completeChildren: 1,
    totalChildren: 2,
  },
};

describe('row', () => {
  it('should add the provided products to the provided rows', () => {
    expect(addProductToRows([productRow, productModelRow], [product, productModel])).toEqual([
      {
        ...productRow,
        product,
      },
      {
        ...productModelRow,
        product: productModel,
      },
    ]);

    expect(addProductToRows([productRow, productModelRow], null)).toEqual([productRow, productModelRow]);
  });

  it('should return the identifiers of the provided rows', () => {
    expect(getAssociationIdentifiers([productRow, productModelRow])).toEqual({
      products: ['bag'],
      product_models: ['braided-hat'],
    });
  });

  it('should tell if the provided row is a RowWithProduct', () => {
    expect(isRowWithProduct(productRow)).toEqual(false);
    expect(
      isRowWithProduct({
        ...productRow,
        product,
      })
    ).toEqual(true);
  });

  it('can filter a row on its label or identifier', () => {
    expect(filterOnLabelOrIdentifier('b')(productRow)).toEqual(true);
    expect(filterOnLabelOrIdentifier('ba')(productRow)).toEqual(true);
    expect(filterOnLabelOrIdentifier('Nice')({...productRow, product})).toEqual(true);
    expect(filterOnLabelOrIdentifier('k')(productRow)).toEqual(false);
  });
});
