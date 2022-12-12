class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

// Create a Doubly Linked List
class LinkedList {

    // Constructor (takes an optional initializer list)
    constructor(initializer_list = null) {
        this.head = this.tail = null;
        this.size = 0;
        if (initializer_list) {
            initializer_list.forEach(item => {
                let temp = new Node(item);
                if (!this.head) {
                    this.head = this.tail = temp;
                } else {
                    this.tail.next = temp;
                    let prv = this.tail;
                    this.tail = this.tail.next;
                    this.tail.prev = prv;
                }
                this.size++;
            });
        } 
    }
    
    // Insert at head
    push_front(item) {
        let temp = new Node(item);
        if (!this.head) {
            this.head = this.tail = temp;
        } else {
            let nxt = this.head
            temp.next = nxt;
            this.head = temp;
        }
        this.size++;
    }

    // Insert at tail
    push_back(item) {
        let temp = new Node(item);
        if (!this.tail) {
            this.head = this.tail = temp;
        } else {
            let prv = this.tail;
            this.tail.next = temp;
            this.tail = this.tail.next;
            this.tail.prev = prv;
        }
        this.size++;
    }

    // Insert at index
    insert_at(item, index) {
        if (index < 0 || index >= this.size) {
            return
        } else if (index === 0) {
            this.push_front(item);
        } else if (index === this.size - 1) {
            this.push_back(item);
        } else {
            let curr = this.head
            let temp = new Node(item);
            for (let i = 0; i < index; i++){
                curr = curr.next;
            }
            let nxt = curr.next;
            let prv = curr;
            temp.next = nxt;
            temp.prev = prv;
            curr.next = temp;
            nxt.prev = temp;
            this.size++;
        }
    }

    // Get at index
    value_at(index) {

    }

    // Delete at head
    pop_front() {

    }

    // Delete at tail
    pop_back() {

    }

    // Delete at index
    delete_at(index) {

    }

    // Clear list
    clear() {
        this.head = this.tail = null;
        this.size = 0;
    }

    get_size() {
        console.log("List size:", this.size);
        return this.size;
    }

    // Print list
    print_list() {
        let curr = this.head;

        while(curr) {
            console.log(curr.data);
            curr = curr.next;
        }
     }
}

const ll = new LinkedList([1,2,4,5]);
ll.push_front(0);
ll.push_back(6);
ll.insert_at(-1, 0);
ll.insert_at(7, 6);
ll.insert_at(3, 3);
ll.insert_at(-2, 0);
ll.print_list();
ll.get_size();

ll.clear();
ll.print_list();
ll.get_size();