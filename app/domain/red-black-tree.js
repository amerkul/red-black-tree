import Stack from "./stack.js";
/**
 * Node class represents the node of black-red tree. Every node has information
 * about its children, color (red or black) and parent.
 */
export class Node {

    constructor(data) {
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.color = 'red';
    }

    sibling() {
        if (this.parent === null) {
            return null;
        } 
        if (this === this.parent.left) {
            return this.parent.right;
        }
        return this.parent.left;
    }

    hasRedChild() {
        return (this.left !== null && this.left.color === 'red')
        || (this.right !== null && this.right.color === 'red');
    }
}

/**
 * Red-Black tree is a binary search tree in which every node is 
 * colored with either red or black. It is a type of self balancing 
 * binary search tree.
 */
export class RedBlackTree {

    #root = null;

    constructor() {}

    get root() {
        return this.#root;
    }

    /**
     * Insert a new node. Time complexity O(log(n)).
     * After inserting It starts balancing if the node isn't a root 
     * or the node's grandparent isn't null.
     * @param {Number} data 
     */
    insert(data) {
        let newNode = new Node(data);
        if (this.#root === null) {
            newNode.color = 'black';
            this.#root = newNode;
            return;
        }
        let current = this.#root;
        let parent = null;
        // search for a place
        while (current !== null) {
            parent = current;
            if (newNode.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        newNode.parent = parent;
        if (newNode.data < parent.data) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
        if (newNode.parent.parent === null) {
            return;
        }
        this.#fixInsert(newNode);
    }

    /**
     * Node is a grandparent of the inserting node.
     * The method implements tree balancing.
     * @param {Node} node 
     */
    #fixInsert(node) {
        let uncle;
        // two red nodes are one by one
        while (node.parent.color === 'red') {
            if (node.parent === node.parent.parent.right) {
                uncle = node.parent.parent.left;
                if (uncle !== null && uncle.color === 'red') {
                    // return a grandparent
                    node = this.#swapColorsAndChangeNode(uncle, node);
                } else if (uncle === null || uncle.color === 'black') {
                    // right left
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.#rightRotate(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.#leftRotate(node.parent.parent);
                }
            } else {
                uncle = node.parent.parent.right;
                if (uncle !== null && uncle.color === 'red') {
                    this.#swapColorsAndChangeNode(uncle, node);
                } else if (uncle === null || uncle.color === 'black') {
                    // left right
                    if (node == node.parent.right) {
                        node = node.parent;
                        this.#leftRotate(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.#rightRotate(node.parent.parent);
                }
            }
            // Get a root node.
            if (node === this.#root) {
                break;
            }
        }
        // The root is always black.
        this.#root.color = 'black';
    }

    /**
     * Swap colors because uncle is red.
     * @param {Node} uncle 
     * @param {Node} node 
     */
    #swapColorsAndChangeNode(uncle, node) {
        uncle.color = 'black';
        node.parent.color = 'black';
        node.parent.parent.color = 'red';
        return node.parent.parent;
    }

    /**
     * Left rotating.
     * @param {Node} node 
     */
    #leftRotate(node) {
        let newParent = node.right;
        node.right = newParent.left;
        if (newParent.left !== null) {
            newParent.left.parent = node;
        }
        newParent.parent = node.parent;
        if (node.parent === null) {
            this.#root = newParent;
        } else if (node === node.parent.left) {
            node.parent.left = newParent;
        } else {
            node.parent.right = newParent;
        }
        newParent.left = node;
        node.parent = newParent;
    }

    /**
     * Right rotating.
     * @param {Node} node 
     */
    #rightRotate(node) {
        let newParent = node.left;
        node.left = newParent.right;
        if (newParent.right !== null) {
          newParent.right.parent = node;
        }
        newParent.parent = node.parent;
        if (node.parent === null) {
          this.#root = newParent;
        } else if (node == node.parent.right) {
          node.parent.right = newParent;
        } else {
          node.parent.left = newParent;
        }
        newParent.right = node;
        node.parent = newParent;
    }

    /**
     * Search a node. If not exist, null will return.
     * Time complexity O(log(n)).
     * @param {Number} data 
     * @returns 
     */
    search(data) {
        let current = this.#root;
        while (current !== null) {
            if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
            } else {
                return current;
            }
        } 
        return current;
    }

    /**
     * Delete a node if it exists. Time complexity O(log(n)).
     * After deleting It starts balancing.
     * @param {Number} data 
     */
    delete(data) {
        let current = this.#root;
        let nodeToDelete = null;
        while (current !== null) {
            if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
            } else {
                nodeToDelete = current;
                break;
            }
        }
        if (nodeToDelete === null) {
            console.log("Couldn't find data in the tree");
            return;
        }
        this.#deleteNode(nodeToDelete);

    } 

    #deleteNode(nodeToDelete) {
        let replacingNode = this.#searchReplacingNode(nodeToDelete);
        let bothBlack = (replacingNode === null || replacingNode.color === 'black') && nodeToDelete.color === 'black';
        let parent = nodeToDelete.parent;
        //It's a leaf.
        if (replacingNode === null) {
            // It's a root.
            if (nodeToDelete === this.#root) {
                this.#root = null;
            } else {
                if (bothBlack) {
                    // Resolve a different black depth.
                    this.#fixDoubleBlack(nodeToDelete);
                } else if (nodeToDelete.sibling() !== null) {
                    // Keep the same black depth.
                    nodeToDelete.sibling().color = 'red';
                }
                if (parent.right === nodeToDelete) {
                    parent.right = null;
                } else {
                    parent.left = null;
                }
            }
            return;
        }
        // It has one child.
        if (nodeToDelete.left === null || nodeToDelete.right === null) {
            // It's a root.
            if (nodeToDelete === this.#root) {
                this.#root.data = replacingNode.data;
                nodeToDelete.left = null;
                nodeToDelete.right = null;
            } else {
                if (parent.left === nodeToDelete) {
                    parent.left = replacingNode;
                } else {
                    parent.right = replacingNode;
                }
                replacingNode.parent = parent;
                // Keep the same black depth.
                if(bothBlack) {
                    this.#fixDoubleBlack(replacingNode);
                } else {
                    replacingNode.color = 'black';
                }
            }
            return;
        }
        // It has two children.
        this.#swapValues(nodeToDelete, replacingNode);
        this.#deleteNode(replacingNode);
    }

    #fixDoubleBlack(node) {
        if (node === this.#root) {
            return;
        }
        let sibling = node.sibling();
        let parent = node.parent;
        if (sibling === null) {
            this.#fixDoubleBlack(parent);
        } else {
            // Swap colors and do rotate.
            if (sibling.color === 'red') {
                parent.color = 'red';
                sibling.color = 'black';
                if (parent.left === sibling) {
                    this.#rightRotate(parent);
                } else {
                    this.#leftRotate(parent);
                }
                // Continue resolving problem with the black depth
                this.#fixDoubleBlack(node);
            } else {
                if (sibling.hasRedChild()) {
                    if (sibling.left !== null && sibling.left.color === 'red') {
                        // right
                        if (sibling.parent !== null && sibling.parent.left === sibling) {
                            sibling.left.color = sibling.color;
                            sibling.color = parent.color;
                            this.#rightRotate(parent);
                        } else {
                        // right left
                            sibling.left.color = parent.color;
                            this.#rightRotate(sibling);
                            this.#leftRotate(parent);
                        }
                    } else {
                        // left right
                        if (sibling.parent !== null && sibling.parent.left === sibling) {
                            sibling.right.color = parent.color;
                            this.#leftRotate(sibling);
                            this.#rightRotate(parent);
                        } else {
                            // left
                            sibling.right.color = sibling.color;
                            sibling.color = parent.color;
                            this.#leftRotate(parent)
                        }
                        parent.color = 'black';
                    }
                } else {
                    // two black children
                    sibling.color = 'red';
                    if (parent.color === 'black') {
                        this.#fixDoubleBlack(parent);
                    } else {
                        parent.color = 'black';
                    }
                }
            }
        } 
    }

    #searchReplacingNode(node) {
        if (node.left === null && node.right === null) {
            return null;
        } else if (node.left !== null && node.right !== null) {
            return this.#min(node.right);
        } else if (node.left !== null) {
            return node.left;
        } else {
            return node.right;
        }
    }

    #swapValues(n1, n2) {
        let temp = n1.data;
        n1.data = n2.data;
        n2.data = temp;
    }

    /**
     * Find a minimum node
     * @param {Node} node 
     * @returns 
     */
    #min(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    /**
     * Time complexity is O(n).
     * @param {Number} node 
     * @returns Array
     */
    inOrder(node) {
        let callStack = new Stack();
        let current = node;
        let result = [];
        while (true) {
            while (!!current) {
                callStack.push(current);
                current = current.left;
            }
            if (callStack.peek() === undefined) {
                break;
            }
            let lastCurrent = callStack.pop();
            result.push(lastCurrent.data);
            current = lastCurrent.right;
        }
        return result;
    }

    /**
     * Time complexity is O(n).
     * @param {Number} node 
     * @returns Array
     */
    preOrder(node) {
        let callStack = new Stack();
        let current = node;
        let result = [];
        while (true) {
            while (!!current) {
                result.push(current.data);
                callStack.push(current);
                current = current.left;
            }
            if (callStack.peek() === undefined) {
                break;
            }
            let lastCurrent = callStack.pop();
            current = lastCurrent.right;
        }
        return result;
    }
          
}
