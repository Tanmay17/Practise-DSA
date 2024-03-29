class Node {
    constructor ( data, left=null, right=null ){
        this.left = left;
        this.data = data;
        this.right = right;
    }
}

class BST {
    constructor () {
        this.root = null;
    }

    add ( data ) {
        const node = this.root; 
        if ( node == null ) {
            this.root = new Node( data );
            return;
        } else {
            const searchTree = ( node )=> {

                if ( data < node.data ) {

                    if ( node.left == null ) {
                        node.left = new Node( data );
                        return;
                    }
                    else {
                        return searchTree( node.left );
                    }

                } else if ( data > node.data ) {

                    if ( node.right == null ) {
                        node.right = new Node( data );
                        return;
                    }
                    else {
                        return searchTree( node.right );
                    }

                } else {
                    return null;
                }

            }
            return searchTree( node );
        }
    }

    findMin() {

        let current = this.root;
        while ( current.left !== null ) {
            current = current.left;
        }
        return current.data;

    }

    findMax() {

        let current = this.root;
        while ( current.right !== null ) {
            current = current.right;
        }
        return current.data;

    }

    find ( data ) {
        let current = this.root;
        while ( current.data !== data ) {
            if (current === null) {
                return null;
            }

            if ( data < current.data ) {
                current = current.left;
            } else if ( data > current.data ) {
                current = current.right;
            }
        }
        return current;
    }

    isPresent ( data ) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    remove ( data ) {
        const removeNode = function ( data, node ) {

            if ( node == null ) return null;

            if ( node.data == data ) {

                if ( node.left == null && node.right == null )  return null;
                if ( node.right == null ) return node.left;
                if ( node.left == null ) return node.right;
                
                let tempnode = node.right;
                while ( tempnode.left !== null ) {
                    tempnode = tempnode.left;
                }
                node.data = tempnode.data;
                node.right = removeNode( tempnode.data, node.right );
                return node;

            } else if ( node.data < data ) {
                node.right = removeNode( data, node.right );
                return node;
            } else {
                node.left = removeNode( data, node.left );
                return node;
            }

        }
        this.root = removeNode( data, this.root );
    }

    isBalanced() {
        return ( this.findMinHeight() >= this.findMaxHeight()-1 );
    }

    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }

    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }

    // left - root - right
    inOrder() {
        if ( this.root == null ) {
            return null;
        } else {
            const result = new Array();
            function traverseinOrder ( node ) {
                if ( node.left ) traverseinOrder( node.left );
                result.push( node.data );
                if ( node.right ) traverseinOrder( node.right );
            }
            traverseinOrder( this.root )
            return result;
        }
    }

    // root - left - right 
    preOrder() {
        if ( this.root == null ) {
            return null;
        } else {
            const result = new Array();
            function traverseinOrder ( node ) {
                result.push( node.data );
                if ( node.left ) traverseinOrder( node.left );
                if ( node.right ) traverseinOrder( node.right );
            }
            traverseinOrder( this.root )
            return result;
        }
    }

    //  left - right - root
    postOrder() {
        if ( this.root == null ) {
            return null;
        } else {
            const result = new Array();
            function traverseinOrder ( node ) {
                if ( node.left ) traverseinOrder( node.left );
                if ( node.right ) traverseinOrder( node.right );
                result.push( node.data );
            }
            traverseinOrder( this.root )
            return result;
        }
    }

    // levelOrder() {
    // }
}

const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);
console.log( "BST isPresent", bst.isPresent(3) );
bst.add(10);
console.log( "BST is Balanced: ", bst.isBalanced() );
bst.remove(9)
console.log(bst.inOrder());
console.log(bst.preOrder());