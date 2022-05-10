#include <stdio.h>

int main () {
    int a = 5;
    int b = 5;
    int c = 0;
    int d = 1;

    a = 10;

    c = c+a+b;

    if(c == 15) {
        int a = 3;
        c = a+b;
    }

    for(int i = 0; i < 5; i++) {
        d += i;
    }
    int loop = 1;
    while(loop) {
        int v = a;
        a = c+d;

    }

    printf("Result = %d\n", c);

    return 0;

}