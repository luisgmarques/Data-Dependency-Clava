// comment
/*
    Longer
    Comment

*/

#include <stdio.h>

int add(int z,int x);

int main () {
    int a = 5;
    int b = 5;
    int c = 0;
    int d = 1;
    int e = 0;

    e = add(a,b);

    a = 10;

    c = c+a+b;


    //printf("Result = %d\n", c);

    return 0;

}

int add(int z, int x) {
    int r;
    r = z+x;
    return r;
}