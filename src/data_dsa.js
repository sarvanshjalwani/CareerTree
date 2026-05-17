export const nodes = [
    { id: "n0", text: "DSA" },
    { id: "n1", text: "Learn The Basics" },
    { id: "n2", text: "Arrays" },
    { id: "n3", text: "Binary Search" },
    { id: "n4", text: "Strings" },
    { id: "n5", text: "Linked Lists" },
    { id: "n6", text: "Recursion" }
];
export const subnodes = [
    {
    id: "s1",
    parentId: "n1",
    text: "What is C++ STL?",
    isSubnode: true,

    // YouTube link
    link: [
        "https://www.youtube.com/watch?v=RRVYpIET_RU"
    ],

    // Long formatted content split into array of paragraphs
    content: [
        `The C++ Standard Template Library (STL) provides pre-built data structures and algorithms so that developers don’t have to implement everything from scratch. STL increases coding speed, reduces bugs, and is heavily used in competitive programming and real-world projects.`,

        `STL consists of four major components:
        1. Containers → data structures (vector, set, map, queue, stack, priority_queue)
        2. Algorithms → sort(), reverse(), count(), binary_search(), etc.
        3. Iterators → work like pointers to traverse containers
        4. Functors → function objects (used with algorithms)
        
        These components allow programmers to focus more on logic and less on writing basic utilities.`,

        `✅ Basic STL Usage:
        #include <bits/stdc++.h>
        using namespace std;
        
        int main() {
            vector<int> v;
            sort(v.begin(), v.end());   // Using STL algorithm
        }`,

        `🚀 Important STL Containers + Initialization Syntax:`,

        `🔹 vector (Dynamic array)
        Stores elements in continuous memory and allows fast random access.
        ➤ Initialization:
            vector<int> v;              // empty vector
            vector<int> v = {1, 2, 3};  // vector with values
            vector<int> v(5, 0);        // {0,0,0,0,0}`,

        `🔹 set (Unique sorted values)
        Removes duplicates and stores elements in sorted order.
        ➤ Initialization:
            set<int> s;                 
            set<int> s = {3, 1, 2};     // stored as {1, 2, 3}`,

        `🔹 map (Key–value pairs sorted by key)
        Useful for frequency counting or lookups.
        ➤ Initialization:
            map<int, string> mp;
            mp[1] = "Apple";
            mp[2] = "Mango";`,

        `🔹 stack (LIFO – last in, first out)
        ➤ Initialization:
            stack<int> st;
            st.push(10);`,

        `🔹 queue (FIFO – first in, first out)
        ➤ Initialization:
            queue<int> q;
            q.push(5);`,

        `🔹 priority_queue (Max heap by default)
        ➤ Initialization:
            priority_queue<int> pq;                      // max-heap
            priority_queue<int, vector<int>, greater<int>> pqMin;  // min-heap`,

        `STL helps programmers solve problems faster, write cleaner code, and avoid implementation errors. Mastering STL boosts efficiency—especially in competitive programming.`
    ],

    compiler: true,

    question: [
        "Write a C++ program using vector to take N integers as input and print them in reverse order.",
        "Write a C++ program using set to remove duplicate numbers from an array and print the final unique sorted elements."
    ]
}

    ,
   {
    id: "s2",
    parentId: "n1",
    position: { top: 200, left: "25%" },
    text: "Hashing in C++",
    isSubnode: true,

    // YouTube link
    link: [
        "https://www.youtube.com/watch?v=KEs5UyBJ39g"
    ],

    // Long formatted content split into array of paragraphs
    content: [
        `Hashing is a technique used to map data of arbitrary size to fixed-size values (hash codes). In C++, hashing is used via containers like unordered_map and unordered_set, which provide near constant time complexity on average for insertions, deletions and lookups. Hashing helps us solve problems like frequency counting, duplicate detection, caching and more.`,

        `✅ Basic Syntax Usage:
        #include <bits/stdc++.h>
        using namespace std;

        int main() {
            unordered_map<string, int> freq;
            freq["apple"] = 3;
            if (freq.find("mango") != freq.end()) {
                // found
            }
        }`,

        `🚀 Important C++ Hashing Containers + Initialization Syntax:

        🔹 unordered_map (Key–value pairs using hash table)
        ➤ Initialization:
            unordered_map<int, string> mp;
            mp[10] = "Ten";
            mp.emplace(20, "Twenty");

        🔹 unordered_set (Unique values using hash table)
        ➤ Initialization:
            unordered_set<int> s;
            s.insert(5);
            s = {1, 2, 3, 4};`,

        `Hashing containers use a hash function to determine the bucket for each element. They provide average O(1) time complexity for many operations, but worst‐case O(n) in rare scenarios (e.g., many collisions). For competitive programming and large data lookups, unordered_map and unordered_set are often preferred over map and set because of their speed advantage when order is not required.`,
        
        `By mastering hashing, you can optimize solutions for problems involving duplicates, fast lookups, memoization, and caching—making your code both faster and simpler.`
    ],

    compiler: true,

    question: [
        "Write a C++ program using unordered_map to count the frequency of each word in a given string and then print the three most frequent words.",
        "Write a C++ program using unordered_set to check if there are any duplicates in an array of N integers in O(N) average time."
    ]
}
,{
    id: "s3",
    parentId: "n2",
    position: { top: 320, left: "25%" },
    text: "Left Rotate Array by D Places",
    isSubnode: true,

    // YouTube link
    link: [
        "https://www.youtube.com/watch?t=485&v=wvcQg43_V8U&feature=youtu.be"
    ],

    content: [
        `Left rotating an array by d places means shifting each element toward the left and placing the first d elements at the end. For example, rotating [1,2,3,4,5,6] by d = 2 results in [3,4,5,6,1,2]. This operation is frequently used in coding interviews and array manipulation problems.`,

        `✅ Basic Code Structure:
        #include <bits/stdc++.h>
        using namespace std;

        int main() {
            vector<int> arr = {1, 2, 3, 4, 5, 6};
            int d = 2;
            // perform left rotation
        }`,

        `🚀 Approaches to Rotate Array:

        🔹 1. Temporary array method
            • Copy elements from index d to end into temp
            • Append first d elements at end
            • Time: O(n), Space: O(n)

        🔹 2. Reversal Algorithm (Most efficient)
            • Reverse first d elements
            • Reverse remaining n-d elements
            • Reverse whole array
            • Time: O(n), Space: O(1)

        🔹 3. Using STL rotate
            std::rotate(arr.begin(), arr.begin() + d, arr.end());
            • Cleanest and optimized method using STL`
    ],

    compiler: true,
    question: []
}
   ,
    {
    id: "s4",
    parentId: "n2",
    position: { top: 440, left: "25%" },
    text: "Kadane’s Algorithm (Maximum Subarray Sum)",
    isSubnode: true,

    // YouTube link
    link: [
        "https://www.youtube.com/watch?v=AHZpyENo7k4&feature=youtu.be"
    ],

    // Content split into paragraphs
    content: [
        `Kadane’s Algorithm is an efficient method to find the maximum sum of a contiguous sub-array within a given array of numbers. It works in O(n) time and uses O(1) extra space by maintaining running sums and updating the maximum found so far. :contentReference[oaicite:1]{index=1}`,

        `✅ Basic syntax and idea:
        #include <bits/stdc++.h>
        using namespace std;

        int main() {
            vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
            int n = arr.size();
            // apply Kadane’s Algorithm
        }`,

        `🚀 Algorithm’s core logic:
        Maintain two variables:
        • maxEndingHere = arr[0]
        • maxSoFar = arr[0]
        Then iterate i from 1 to n-1:
          maxEndingHere = max(arr[i], maxEndingHere + arr[i])
          maxSoFar = max(maxSoFar, maxEndingHere)
        After loop, maxSoFar holds the maximum subarray sum. :contentReference[oaicite:2]{index=2}`,

        `Applications:
        • Finding the best “winning streak” in an array of positives & negatives  
        • Used in competitive programming and interview problems  
        • Variants: maximum circular subarray, maximum product subarray, etc. :contentReference[oaicite:3]{index=3}`
    ],

    compiler: true,

    question: [
        "Write a C++ program that reads an integer N, then reads N integers into an array, uses Kadane’s Algorithm to compute the maximum contiguous subarray sum, and prints the result.",
        "Write a C++ program that reads N, the array of N integers (can include negatives), and prints the start and end indices (0-based) of the subarray which gives the maximum contiguous sum using Kadane’s Algorithm (if multiple, print any one)."
    ]
}
,
    {
    id: "s5",
    parentId: "n2",
    position: { top: 560, left: "25%" },
    text: "2 Sum Problem",
    isSubnode: true,

    // YouTube link
    link: [
        "https://www.youtube.com/watch?v=UXDSeD9mN-k"
    ],
content: [
    `The 2 Sum problem is one of the most popular and frequently asked questions in coding interviews. The problem statement sounds simple: given an array and a target value, determine whether there are two numbers in the array that add up to the target. However, interviewers use this problem to evaluate your ability to optimize and reason about time complexity — not just produce a correct answer.`,

    `The brute-force solution involves using two nested loops: for each number, check every other number to see if the sum equals the target. While simple to implement, it results in a time complexity of O(n²), which quickly becomes slow when dealing with large input sizes. Understanding why this approach is inefficient helps build intuition toward optimization, a skill that interviewers look for.`,

    `The optimal solution uses hashing through an unordered_map. Instead of repeatedly scanning the array, the unordered_map stores numbers that have already been seen. For each element x, we compute its complement (target - x). If the complement exists in the map, we immediately know the two numbers. This makes the solution extremely fast with an average time complexity of O(n), making it suitable for large datasets and real-time applications.`,

    `The logic can be understood by thinking like this: instead of searching through the array again and again, we let a hash table answer the question "Have we seen the number that pairs with this to reach the target?" This is why hashing is powerful — constant time lookup replaces repeated scanning, turning an O(n²) task into O(n). Learning to use hashing effectively is a major milestone in mastering problem-solving.`,

    `Apart from interviews, 2 Sum also serves as the foundation for important advanced problems like 3 Sum, 4 Sum, Subarray Sum Equals K, and Two Sum in a sorted array using the two-pointer technique. Understanding 2 Sum thoroughly opens the door to these variations, all of which are used extensively in competitive programming and real-world software challenges.`,

    `Companies ask this problem because it tests critical skills: logical thinking, understanding of hash maps, optimal reasoning, and code quality. Interviewers want to see if you recognize when brute force is bad and how to confidently transition to a better, optimized solution. Once you master this, many other array and hashing problems feel natural and intuitive.`
]
,

    compiler: true,

    question: [
        "Write a C++ program that reads an integer N, then reads N integers into an array, then reads a target value T, and outputs the indices (0-based) of two distinct elements whose sum equals T. Assume exactly one solution exists.",
        "Write a C++ program that reads an array of N integers (may contain duplicates) and a target value T. Print all *distinct pairs* of values (not indices) from the array whose sum is T. Each pair should be printed only once, and order of pairs does not matter."
    ]
}
, {
    id: "s6",
    parentId: "n3",
    position: { top: 100, left: "25%" },
    text: "Binary Search + Rotated Sorted Array",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=MHf6awe89xw&feature=youtu.be"
    ],

    content: [
        `Binary Search is one of the most powerful searching techniques used on sorted arrays. Instead of scanning the entire array linearly, binary search repeatedly divides the search interval into half. We compare the target value with the middle element and decide whether to search on the left half or the right half. This allows binary search to work in O(log n) time, which is very efficient for large datasets. Mastering binary search is crucial for many advanced problems in competitive programming and interviews.`,

        `Binary Search works only when the array is **sorted**. But what if the array is sorted and then rotated at some pivot point? Example: [4,5,6,7,0,1,2]. Although the array is no longer fully sorted, one half of the array will always remain sorted at every step of the search. This key observation allows us to still apply binary search by identifying which side is sorted and deciding based on that where to continue searching.`,

        `The logic for binary search in a rotated sorted array is:
        1. Find mid.
        2. Check if the left half is sorted (arr[low] <= arr[mid]).
           • If sorted, check whether target lies in this range; if yes, discard the right half.
        3. Otherwise, the right half must be sorted.
           • Check if the target is in this half; if yes, discard the left half.
        By narrowing down the search space each iteration, we still maintain O(log n) time complexity.`,

        `✅ Code Implementation of Searching in Rotated Sorted Array:
        #include <bits/stdc++.h>
        using namespace std;

        int search(vector<int>& nums, int target) {
            int low = 0, high = nums.size() - 1;
            while (low <= high) {
                int mid = (low + high) / 2;
                if (nums[mid] == target) return mid;

                // Check if left half is sorted
                if (nums[low] <= nums[mid]) {
                    if (target >= nums[low] && target < nums[mid])
                        high = mid - 1;
                    else
                        low = mid + 1;
                }
                else { // Right half is sorted
                    if (target > nums[mid] && target <= nums[high])
                        low = mid + 1;
                    else
                        high = mid - 1;
                }
            }
            return -1;
        }
        This modified binary search ensures that even in a rotated array, the search remains efficient and avoids linear scanning.`
    ],

    compiler: true,

    question: [
        "Write a C++ program that reads a sorted rotated array and a target T, and returns the index of T using binary search in a rotated array (or -1 if not found).",
        "Modify the above program to handle duplicates in the rotated sorted array and return all indices where the target appears."
    ]
}
    , {
    id: "s7",
    parentId: "n3",
    position: { top: 200, left: "25%" },
    text: "Lower Bound & Upper Bound in C++ STL",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=6zhGS79oQ4k&feature=youtu.be"
    ],

    content: [
        `lower_bound() and upper_bound() are binary-search-based functions available in the <algorithm> library in C++. Both functions only work correctly on sorted data. They allow us to search values and ranges efficiently in O(log n) time, which is much faster than linear scanning. These functions return iterators, making them extremely valuable when working with vectors and other STL containers.`,

        `✔ lower_bound(start, end, value)
        → Returns an iterator pointing to the **first element that is not less than (>=) value**.
        Example: In [1, 2, 2, 3, 5], lower_bound(arr, arr+5, 2) returns iterator to index 1 (first 2).`

        +
        `📌 Code Example (lower_bound):
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            vector<int> v = {1, 2, 2, 3, 5};
            int x = 2;
            auto it = lower_bound(v.begin(), v.end(), x);
            if (it != v.end())
                cout << "Lower bound index: " << (it - v.begin());
            else
                cout << "No element >= x found";
        }`,

        `✔ upper_bound(start, end, value)
        → Returns an iterator to the **first element greater than value**.
        It skips all duplicates and lands on the next higher element. Useful when counting elements.`

        +
        `📌 Code Example (upper_bound):
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            vector<int> v = {1, 2, 2, 3, 5};
            int x = 2;
            auto it = upper_bound(v.begin(), v.end(), x);
            if (it != v.end())
                cout << "Upper bound index: " << (it - v.begin());
            else
                cout << "No element > x found";
        }`,

        `A powerful usage of both functions together is to count occurrences of a number in sorted data using:
            count = upper_bound(v.begin(), v.end(), x) - lower_bound(v.begin(), v.end(), x);
        This gives us how many times x appears in O(log n) time, instead of scanning linearly. lower_bound and upper_bound are frequently used in competitive programming to optimize searching and range queries.`,

        `Mastering these functions enables solutions to problems like "first element >= X", "count elements in a range," dynamic insert positions, and many binary search variations. These functions are also used heavily in solving 2 pointers + binary search hybrid problems. Understanding how to use iterator results properly helps boost logic development and STL mastery.`
    ],

    compiler: true,

    question: [
        "Write a C++ program that reads N sorted integers, then a value X, and prints how many times X occurs using lower_bound() and upper_bound().",
        "Write a C++ program that reads N sorted integers and values L and R, and prints how many elements lie in the range [L, R] using lower_bound() and upper_bound()."
    ]
}

    ,{
    id: "s8",
    parentId: "n3",
    position: { top: 300, left: "25%" },
    text: "Binary Search on Answer",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=Bsv3FPUX_BA&feature=youtu.be"
    ],

    content: [
        `Binary Search on Answer is applied when instead of searching in an array, we search in a range of possible answers. We use binary search on values, not on indices or array positions. This technique works when the answer lies between a certain range (low to high) and there exists a monotonic condition, meaning if a certain value is possible (valid), then all values smaller or larger follow a consistent pattern.`,

        `To use this technique, we define a helper function feasible(mid) that returns true or false depending on whether mid can be a valid answer. If mid is feasible, we try to improve the answer (either minimize or maximize it) by searching in one half of the space. If mid is not feasible, we move in the opposite direction. This ensures efficiency with time complexity O(log(high - low)).`,

        `Binary Search on Answer is used in optimization problems like "allocate minimum pages", "minimum time to complete tasks", "minimum speed to eat bananas", etc. In all these problems, we are not searching for an element but searching for a valid numeric value. When we can verify an answer using a boolean check function, binary searching the answer becomes extremely powerful.`,

        `✅ Generic Code Template:
        \`\`\`cpp
        long long low = L, high = R, ans = -1;

        while (low <= high) {
            long long mid = low + (high - low) / 2;

            if (feasible(mid)) {
                ans = mid;
                high = mid - 1;      // if searching for minimum possible answer
            }
            else {
                low = mid + 1;
            }
        }
        cout << ans;
        \`\`\`
        In this structure, L and R represent the lowest and highest possible values of the answer. feasible(mid) checks whether mid can be the answer.`
    ],

    compiler: true,

    question: [
        "Given N book pages and K students, write a C++ program using Binary Search on Answer to allocate books such that the maximum pages assigned to any student is minimized.",
        "Given an array and K partitions, write a C++ program to find the maximum minimum subarray sum using Binary Search on Answer."
    ]
}

    ,{
    id: "s9",
    parentId: "n4",
    position: { top: 100, left: "25%" },
    text: "Koko Eating Bananas – Brute / Better / Optimal",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=qyfekrNni90"
    ],

    content: [
        `The “Koko Eating Bananas” problem asks us to find the **minimum eating speed (k)** such that Koko finishes all banana piles within H hours. Each hour she chooses one pile and eats up to k bananas. If fewer remain, she finishes that pile in under an hour, but cannot switch piles in the same hour. Solution space is numeric, so we don’t search piles, we search eating speeds.`,

        `🔥 Brute Force Approach (Try all speeds from 1 to max pile)
        We try every possible k starting from 1 until the largest pile value. For each k, we compute total hours needed using the formula:
        hours += (pile + k - 1) / k   // ceiling division

        \`\`\`cpp
        int minSpeedBrute(vector<int>& piles, int h) {
            int maxPile = *max_element(piles.begin(), piles.end());
            for (int k = 1; k <= maxPile; k++) {
                long long hours = 0;
                for (int p : piles)
                    hours += (p + k - 1) / k;
                if (hours <= h) return k;
            }
            return maxPile;
        }
        \`\`\`
        ⏳ Time: O(maxPile * n)  → **Very slow** when piles are large.`,

        `⚡ Better Approach (Reduce search space)
        Instead of trying all speeds up to infinity, the speed k has a clear range:
           • minimum speed = 1
           • maximum speed = max(piles)
        We still linearly check each speed from [1 … maxPile], but the bound is now smaller. However, still **O(n * maxPile)**.`,

        `🚀 Optimal Approach – Binary Search on Answer (Best)
        Observation: If Koko can eat bananas at speed k within H hours, then any speed > k will also work. This makes the feasibility monotonic → enabling binary search.

        \`\`\`cpp
        bool canEat(vector<int>& piles, int h, int k) {
            long long hours = 0;
            for (int p : piles)
                hours += (p + k - 1) / k; // ceil(p/k)
            return hours <= h;
        }

        int minEatingSpeed(vector<int>& piles, int h) {
            int low = 1, high = *max_element(piles.begin(), piles.end());
            int ans = high;

            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (canEat(piles, h, mid)) {
                    ans = mid;
                    high = mid - 1;     // try smaller speed
                } else {
                    low = mid + 1;      // need bigger speed
                }
            }
            return ans;
        }
        \`\`\`

        ✅ Time Complexity: O(n log maxPile) — **super efficient**
        ✅ Space Complexity: O(1)`,

        `Binary Search on Answer turns an otherwise brute-force numeric trial problem into a logarithmic search problem. The key is recognizing that feasibility is monotonic — once a speed becomes workable, all higher speeds are workable as well. Many optimization problems like “minimum days”, “minimum speed”, “maximum allocation” use this same technique.`
    ],

    compiler: true,

    question: [
        "Write a C++ program to find the minimum eating speed k such that Koko eats all piles within H hours.",
        "Modify the optimal binary search solution to print the total hours required for each tested speed during the binary search process."
    ]
}

    , {
    id: "s10",
    parentId: "n4",
    position: { top: 200, left: "25%" },
    text: "Z-Function / Z Algorithm (String Pattern Matching)",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=6mzNnEGimPA"
    ],

    content: [
        `The Z-Function (or Z Algorithm) is one of the fastest string pattern-matching algorithms used in competitive programming. For a given string, the algorithm constructs a Z-array where Z[i] tells us how many characters from index i match with the prefix of the string. Instead of checking the entire string repeatedly like brute-force matching, the Z algorithm reuses previous computed results, allowing us to do pattern searching in O(n) time.`,

        `To compute the Z-array efficiently, the algorithm maintains a window called the Z-box denoted by [L, R]. The substring s[L...R] matches the prefix of the string. If the current index i falls within that window, we reuse already known results and avoid redundant comparisons. If not, we directly try to expand and match characters. This technique eliminates unnecessary comparisons, making Z algorithm significantly faster than naive matching.`,

        `The Z algorithm can also be used for pattern searching by concatenating:
         pattern + '$' + text
        After computing the Z-array for this new string, every index where Z[i] equals the length of the pattern indicates a pattern match inside the text. This eliminates the need for hashing or additional preprocessing. Z algorithm becomes the perfect choice for problems involving prefix-based checks and substring matching.`,

        `The power of Z-function lies in its adaptability. It can be used to count occurrences of patterns, detect periodic substrings, compute string borders, and solve many advanced string problems in O(n). Unlike brute force (O(n*m)) or KMP (O(n+m)), the Z algorithm is simpler to implement and requires no failure array computation. Mastering Z algorithm builds confidence to handle advanced pattern matching problems.`,

        `✅ Code: Z-function implementation
        \`\`\`cpp
        vector<int> zFunction(string s) {
            int n = s.length();
            vector<int> z(n, 0);
            int L = 0, R = 0;

            for (int i = 1; i < n; i++) {
                if (i <= R)
                    z[i] = min(R - i + 1, z[i - L]);

                while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                    z[i]++;

                if (i + z[i] - 1 > R) {
                    L = i;
                    R = i + z[i] - 1;
                }
            }
            return z;
        }
        \`\`\``,

        `✅ Pattern Matching using Z-Function
        \`\`\`cpp
        vector<int> searchPattern(string text, string pat) {
            string s = pat + '$' + text;
            vector<int> z = zFunction(s);

            vector<int> result;
            for (int i = 0; i < z.size(); i++) {
                if (z[i] == pat.length())
                    result.push_back(i - pat.length() - 1);
            }
            return result;
        }
        \`\`\`
        `,
        
        `Z algorithm provides a clean and efficient approach to solving string matching problems. Whenever the problem involves identifying repeated prefixes, locating substrings, or dealing with pattern searches — Z-function should be your first thought.`
    ],

    compiler: true,

    question: [
        "Write a C++ program that prints the Z-array for a given input string.",
        "Write a C++ program using Z-function that prints all starting indices where the given pattern appears in a text string."
    ]
}

    ,{
    id: "s11",
    parentId: "n4",
    position: { top: 300, left: "25%" },
    text: "Longest Common Prefix in Strings",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=0sWShKIJoo4"
    ],

    content: [
        `Finding the longest common prefix among an array of strings means finding the largest initial substring that is shared by all the strings. For example: ["flower", "flow", "flight"] → "fl". If there’s no common starting substring, the answer is an empty string. :contentReference[oaicite:1]{index=1}`,

        `A straightforward approach is to use the first string as a reference, then for each character position check whether all other strings have the same character at that position. Stop when a mismatch occurs or when any string ends. This results in time complexity O(n * m), where n is number of strings and m is length of shortest string. :contentReference[oaicite:2]{index=2}`,

        `Another useful method uses sorting: sort the array of strings lexicographically, then only compare the first and last strings — the longest common prefix of those two is the LCP of the whole array. This reduces comparisons somewhat, though sorting adds its own cost. :contentReference[oaicite:3]{index=3}`,

        `Here is a clean C++ implementation:
        \`\`\`cpp
        string longestCommonPrefix(vector<string>& strs) {
            if (strs.empty()) return "";
            sort(strs.begin(), strs.end());
            string first = strs.front(), last = strs.back();
            int i = 0, n = min(first.size(), last.size());
            while (i < n && first[i] == last[i]) {
                i++;
            }
            return first.substr(0, i);
        }
        \`\`\`
        This approach is elegant and leverages built-in sort plus simple prefix comparison.`,

        `In competitive programming, knowing LCP is helpful for many string-manipulation tasks: grouping strings, building tries, optimizing comparisons, solving common prefix queries dynamically, and more. Mastering LCP opens the door to more advanced string algorithms like suffix arrays, tries, Z-function, and KMP.`  
    ],

    compiler: true,

    question: [
        "Write a C++ program that reads an integer N, then reads N strings, and prints the longest common prefix of all N strings.",
        "Write a C++ program that reads an integer N, then reads N strings, and prints the longest common prefix among them using the sort-and-compare first/last method."
    ]
}
, {
    id: "s12",
    parentId: "n5",
    position: { top: 500, left: "25%" },
    text: "Introduction to Linked List",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=Nq7ok-OyEpg"
    ],

    content: [
        `A linked list is a linear data structure in which elements are stored in nodes, and each node points to the next node in the sequence. Unlike arrays, linked list nodes are **not stored in contiguous memory locations**; instead, each node contains data and a pointer/reference to the next node. This structure allows dynamic memory allocation and flexible insertion/deletion of nodes. :contentReference[oaicite:0]{index=0}`,

        `The basic terminology includes:  
        • **Node**: The building block of the list containing data and a next pointer.  
        • **Head**: A pointer/reference to the first node of the list (or NULL if list is empty).  
        • **Tail**: The last node, whose next pointer is NULL in a singly linked list.  
        • **Next**: A pointer in each node that points to the next node in sequence. :contentReference[oaicite:1]{index=1}`,

        `Here is a simple C++ implementation of a singly linked list node and basic operations for insertion at front and traversal:  
        \`\`\`cpp
        struct Node {
            int data;
            Node* next;
            Node(int val) : data(val), next(nullptr) {}
        };

        class LinkedList {
        public:
            Node* head;
            LinkedList() : head(nullptr) {}

            void insertFront(int val) {
                Node* newNode = new Node(val);
                newNode->next = head;
                head = newNode;
            }

            void printList() {
                Node* curr = head;
                while (curr != nullptr) {
                    cout << curr->data << \" -> \";
                    curr = curr->next;
                }
                cout << \"NULL\\n\";
            }
        };
        \`\`\``,

        `Linked lists have several advantages and disadvantages. Advantages include dynamic size (we can grow or shrink as needed), and efficient insertion/deletion (especially at front) since we only update pointers. :contentReference[oaicite:2]{index=2} However, disadvantages include lack of random access (we can’t index i-th element in O(1)), and more memory overhead because of storing next-pointers.`,

        `There are multiple types of linked lists:  
        – **Singly linked list**: each node points only to the next node.  
        – **Doubly linked list**: nodes have two pointers - next and previous, allowing bidirectional traversal.  
        – **Circular linked list**: last node points back to the head, making the list circular. :contentReference[oaicite:3]{index=3}  
        Understanding these types prepares you for more advanced data structures like stacks, queues, graphs, and even tree representations.`,

        `In competitive programming and real-world systems, linked lists are useful when the data size changes over time, or when frequent insertions/deletions happen. While arrays might be simpler for direct indexing, linked lists shine when flexibility and efficient updates matter. Mastering linked lists is a key step in DSA readiness.`
    ],

    compiler: true,

    question: [
        "Write a C++ program to create a singly linked list by inserting nodes at the end. Then display the linked list.",
        "Write a C++ program to delete a node with a given value from a singly linked list, and print the resulting list. If the value does not exist, print \"Value not found\"."
    ]
}
, {
    id: "s13",
    parentId: "n5",
    position: { top: 120, left: "25%" },
    text: "Insert Node in Linked List",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=VaECK03Dz-g&feature=youtu.be"
    ],

    content: [
        `Inserting a node into a linked list is one of the most fundamental operations for this data structure. A singly linked list consists of nodes where each node holds data and a pointer to the next node. Unlike arrays, linked list nodes don’t have contiguous memory addresses; this allows for easy insertion and deletion without shifting elements. Understanding insertion helps you build other operations like deletion, reversal, merging lists, and more.`,

        `There are several insertion positions commonly required:
        1. **At the front (head)** — O(1) operation: create a new node, point its next to the current head, update head.
        2. **At the end (tail)** — O(n) for a singly list without tail pointer: traverse to last node, set its next to new node.
        3. **At a given position (index or after a given node)** — O(n): traverse to that position or node, then re-link pointers to insert the new node.  
        Each case must consider edge cases: empty list, insert at head, insert at tail, invalid positions.`,

        `Here is a sample C++ implementation for insertion operations in a singly linked list:
        \`\`\`cpp
        struct Node {
            int data;
            Node* next;
            Node(int val) : data(val), next(nullptr) {}
        };

        class LinkedList {
        public:
            Node* head;
            LinkedList() : head(nullptr) {}

            // Insert at front
            void insertFront(int val) {
                Node* newNode = new Node(val);
                newNode->next = head;
                head = newNode;
            }

            // Insert at end
            void insertEnd(int val) {
                Node* newNode = new Node(val);
                if (head == nullptr) {
                    head = newNode;
                    return;
                }
                Node* curr = head;
                while (curr->next != nullptr) {
                    curr = curr->next;
                }
                curr->next = newNode;
            }

            // Insert after a given position (0-based)
            void insertAtPosition(int pos, int val) {
                if (pos == 0) {
                    insertFront(val);
                    return;
                }
                Node* curr = head;
                for (int i = 0; curr != nullptr && i < pos-1; i++) {
                    curr = curr->next;
                }
                if (curr == nullptr) {
                    // position out of bounds
                    return;
                }
                Node* newNode = new Node(val);
                newNode->next = curr->next;
                curr->next = newNode;
            }
        };
        \`\`\``,

        `When implementing insertion, watch out for these edge cases:
        • Inserting into an empty list (head == nullptr).  
        • Inserting at head (position 0) or at tail (position = length).  
        • Invalid positions (greater than length or negative) — decide whether to ignore or throw error.  
        • Memory leaks: always allocate new nodes and ensure proper linking; in production code also free nodes when deleting.  
        Mastering insertion operations sets a strong foundation for more advanced linked list algorithms like delete, reverse, detect cycles, merge two lists, etc.`
    ],

    compiler: true,

    question: [
        "Write a C++ program to insert a node at the end of a singly linked list. The program should read N, then N values to build the list, then read a value to insert and print the list after insertion.",
        "Write a C++ program to insert a node at a given position (0-based) in a singly linked list. Read N, the N values, then position P, then the value V. Insert at position P (if valid) and print the linked list."
    ]
}
, {
    id: "s14",
    parentId: "n5",
    text: "Delete a Node in Linked List",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=VaECK03Dz-g"
    ],

    content: [
        `Deleting a node from a linked list is a fundamental operation in data structures. In a singly linked list, you need to adjust the pointers so that the node to delete is skipped and properly freed (in languages with manual memory management). Unlike arrays where deletion shifts elements, in linked lists we simply re-link the nodes, which makes deletion efficient if the node is known. However, care must be taken to manage pointers and handle edge cases.`,

        `There are several deletion cases:
        1. **Delete the head node** — O(1): update head to head->next, free the original head.
        2. **Delete at a given position or after a given node** — O(n): traverse to the node just before the target, then re-link its next pointer to target->next, then delete target.
        3. **Delete the tail node** — O(n): traverse until the second last node, set its next to nullptr, free the last node.
        Each scenario needs checks: empty list, position out of bounds, deleting only node in list, etc.`,

        `Here is a sample C++ implementation illustrating deletion operations:
        \`\`\`cpp
        struct Node {
            int data;
            Node* next;
            Node(int val) : data(val), next(nullptr) {}
        };

        class LinkedList {
        public:
            Node* head;
            LinkedList() : head(nullptr) {}

            void insertEnd(int val) {
                Node* newNode = new Node(val);
                if (!head) {
                    head = newNode;
                    return;
                }
                Node* curr = head;
                while (curr->next) curr = curr->next;
                curr->next = newNode;
            }

            void deleteAtPosition(int pos) {
                if (!head) return;
                if (pos == 0) {
                    Node* temp = head;
                    head = head->next;
                    delete temp;
                    return;
                }
                Node* curr = head;
                for (int i = 0; curr && i < pos-1; i++) {
                    curr = curr->next;
                }
                if (!curr || !curr->next) return; // out of bounds
                Node* temp = curr->next;
                curr->next = temp->next;
                delete temp;
            }
        };
        \`\`\``,

        `When implementing deletion operations, be careful about:
        • Deleting from an empty list (head == nullptr) — nothing to do.  
        • Deleting the head node — must update head pointer.  
        • Deleting at invalid positions — avoid dereferencing nullptr.  
        • Memory management — in manual languages free memory; in C++ use delete, in other languages ensure proper cleanup.  
        • If you maintain a tail pointer, ensure tail is updated when the last node is removed.  
        Mastering deletion prepares you for advanced tasks like list reversal, merging, cycle removal, and more.`  
    ],

    compiler: true,

    question: [
        "Write a C++ program that reads N and then N values to build a singly linked list. Then read an integer P (0-based position). Delete the node at position P (if valid) and print the resulting list.",
        "Write a C++ program that reads N values, builds a singly linked list, then reads a value V. Delete the first node in the list whose data equals V. If no such node exists, print \"Value not found\". Then print the updated list."
    ]
},
  {
    id: "s15",
    parentId: "n6",
    position: { top: 100, left: "25%" },
    text: "Generate Subsequences (String / Array)",
    isSubnode: true,

    link: [
        "https://www.youtube.com/watch?v=eQCS_v3bw0Q&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=8"
    ],

  content: [
    "A subsequence is created by deleting zero or more elements from a string/array without changing the original order. For example, the subsequences of 'abc' are: '', 'a', 'b', 'c', 'ab', 'ac', 'bc', 'abc'.",
    "At every index we make two choices: INCLUDE the character or EXCLUDE it. This makes subsequence generation a classic recursion branching problem (take / not take).",
    "Total number of subsequences for a string of length N = 2^N.",
    "The recursion depth is N, because we explore the full branch until the index reaches length of string.",

    "CODE START ↓",

    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "void generateSubsequences(string s, int index, string current) {",
    "    if (index == s.length()) {",
    "        cout << current << endl;",
    "        return;",
    "    }",
    "",
    "    // EXCLUDE current character",
    "    generateSubsequences(s, index + 1, current);",
    "",
    "    // INCLUDE current character",
    "    generateSubsequences(s, index + 1, current + s[index]);",
    "}",
    "",
    "int main() {",
    "    string s;",
    "    cin >> s;",
    "    generateSubsequences(s, 0, \"\");",
    "    return 0;",
    "}",

    "CODE END ↑",

    "This recursion technique is the base of many advanced problems: subsets, power set, backtracking, combination sum, etc. If you master subsequences, you unlock pattern for solving multiple recursion + DP problems easily."
]
,
    compiler: true,

    question: [
        "Generate all subsequences of a given string.",
        "Generate all subsequences of an array whose sum equals K."
    ]
}


]