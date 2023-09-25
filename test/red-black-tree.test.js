import {RedBlackTree} from '../app/domain/red-black-tree.js';

test('Insert a root node.', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    expect(tree.root.data).toBe(1);
    expect(tree.root.color).toBe('black');
});

test('Insert a right child for a root node', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    expect(tree.root.data).toBe(1);
    expect(tree.root.color).toBe('black');
    expect(tree.root.right.data).toBe(2);
    expect(tree.root.right.color).toBe('red');
});

test('Left rotating after inserting', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.left.color).toBe('red');
    expect(tree.root.data).toBe(2);
    expect(tree.root.color).toBe('black');
    expect(tree.root.right.data).toBe(3);
    expect(tree.root.right.color).toBe('red');
});

test('Insert 1,2,3,4', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.left.color).toBe('black');
    expect(tree.root.right.data).toBe(3);
    expect(tree.root.right.color).toBe('black');
    expect(tree.root.right.right.data).toBe(4);
    expect(tree.root.right.right.color).toBe('red');
});

test('Insert 1,2,3,4,5', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    expect(tree.root.right.data).toBe(4);
    expect(tree.root.right.color).toBe('black');
    expect(tree.root.right.left.data).toBe(3);
    expect(tree.root.right.left.color).toBe('red');
    expect(tree.root.right.right.data).toBe(5);
    expect(tree.root.right.right.color).toBe('red');
});

test('Insert 1,2,3,4,5,6', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    expect(tree.root.right.data).toBe(4);
    expect(tree.root.right.color).toBe('red');
    expect(tree.root.right.left.data).toBe(3);
    expect(tree.root.right.left.color).toBe('black');
    expect(tree.root.right.right.data).toBe(5);
    expect(tree.root.right.right.color).toBe('black');
});

test('Insert 1,2,3,4,5,6,7', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    expect(tree.root.right.data).toBe(4);
    expect(tree.root.right.color).toBe('red');
    expect(tree.root.right.right.data).toBe(6);
    expect(tree.root.right.right.color).toBe('black');
    expect(tree.root.right.right.left.data).toBe(5);
    expect(tree.root.right.right.left.color).toBe('red');
});

test('Insert 1,2,3,4,5,6,7,8', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    expect(tree.root.data).toBe(4);
    expect(tree.root.color).toBe('black');
    expect(tree.root.left.data).toBe(2);
    expect(tree.root.left.color).toBe('red');
    expect(tree.root.right.data).toBe(6);
    expect(tree.root.right.color).toBe('red');
});

test('Insert 1,2,3,4,5,6,7,8,9', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    expect(tree.preOrder(tree.root)).toStrictEqual([4,2,1,3,6,5,8,7,9]);
});

test('Insert 1,2,3,4,5,6,7,8,9,10 and delete 10.', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    tree.delete(10);
    expect(tree.preOrder(tree.root)).toStrictEqual([4,2,1,3,6,5,8,7,9]);
    expect(tree.root.right.right.right.color).toBe('black');
});

test('Insert 1,2,3,4,5,6,7,8,9,10 and delete 9.', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    tree.delete(9);
    expect(tree.preOrder(tree.root)).toStrictEqual([4,2,1,3,6,5,8,7,10]);
    expect(tree.root.right.right.right.color).toBe('black');
});

test('Insert 1,2,3,4,5,6,7,8,9,10 and delete 8.', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    tree.delete(8);
    expect(tree.preOrder(tree.root)).toStrictEqual([4,2,1,3,6,5,9,7,10]);
    expect(tree.root.right.right.right.color).toBe('black');
    expect(tree.root.right.right.color).toBe('red');
});

test('Insert 1,2,3,4,5,6,7,8,9,10 and delete 2.', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    tree.delete(2);
    expect(tree.preOrder(tree.root)).toStrictEqual([6,4,3,1,5,8,7,9,10]);
    expect(tree.root.right.color).toBe('black');
    expect(tree.root.left.left.left.color).toBe('red');
});

test('Insert 1,2,3,4,5,6,7,8,9,10 and delete 6.', () => {
    const tree = new RedBlackTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    tree.delete(6);
    expect(tree.preOrder(tree.root)).toStrictEqual([4,2,1,3,7,5,9,8,10]);
    expect(tree.root.right.right.color).toBe('red');
    expect(tree.root.right.right.right.color).toBe('black');
});

test('Insert 30,20,40,10 and delete 10.', () => {
    const tree = new RedBlackTree();
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(10);
    tree.delete(20);
    expect(tree.preOrder(tree.root)).toStrictEqual([30,10,40]);
});

test('Insert 30,20,40,50 and delete 20.', () => {
    const tree = new RedBlackTree();
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(50);
    tree.delete(20);
    expect(tree.preOrder(tree.root)).toStrictEqual([40,30,50]);
});

test('Insert 30,20,40,35,50 and delete 20.', () => {
    const tree = new RedBlackTree();
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(35);
    tree.insert(50);
    tree.delete(20);
    expect(tree.preOrder(tree.root)).toStrictEqual([35,30,40,50]);
    expect(tree.root.right.right.color).toBe('red');
});

test('Insert 30,20,40,35 and delete 20.', () => {
    const tree = new RedBlackTree();
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(35);
    tree.delete(20);
    expect(tree.preOrder(tree.root)).toStrictEqual([35,30,40]);
});

test('Insert 30,20,40,10 and delete 20.', () => {
    const tree = new RedBlackTree();
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(35);
    tree.delete(20);
    tree.delete(30);
    expect(tree.preOrder(tree.root)).toStrictEqual([35,40]);
    expect(tree.root.right.color).toBe('red');
});
