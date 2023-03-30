#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#include<bits/stdc++.h>
using namespace std;
using namespace __gnu_pbds;
#define int long long
#define mod 1000000007
#define ordered_set tree<int, null_type,less_equal<int>, rb_tree_tag,tree_order_statistics_node_update>
#define inf 1000000000000000000
#define vi vector<int>
int fast_pow(int a, int p)
{
    int res = 1;
    while (p)
    {
        if (p % 2 == 0)
        {
            a = a * 1ll * a % mod;
            p /= 2;
        }
        else
        {
            res = res * 1ll * a % mod;
            p--;
        }
    }
    return res;
}
int lcm(int x, int y) {
    return (x * y) / (__gcd(x, y));
}
int modInverse(int A, int M)
{
    int m0 = M;
    int y = 0, x = 1;
    if (M == 1)
        return 0;
    while (A > 1) {
        int q = A / M;
        int t = M;
        M = A % M, A = t;
        t = y;
        y = x - q * y;
        x = t;
    }
    if (x < 0)
        x += m0;
    return x;
}
vector<int> sieve(int N) {
    vector<int>primes;
    vector<int>isprime(N + 1, 1);
    for (int i = 2; i <= N; i++)
    {
        if (isprime[i] == 1) {
            isprime[i] = i;
            for (int j = i * i; j <= N; j += i) {
                if (isprime[j] == 1)isprime[j] = i;
            }
        }
    }
    return isprime;
}
vector<vector<int>>dir = {{1, 0}, {0, 1}, { -1, 0}, {0, -1}};
vector<string>DIR = {"D", "U", "R", "L"};
int fact(int n)
{
    int res = 1;
    for (int i = 1; i <= n; i++)
    {
        res = res * 1ll * i % mod;
    }
    return res;
}


bool cmp(vector<int>&a, vector<int>&b) {
    return a[0] < b[0];
}
void solve() {
    int n;
    cin >> n;
    vector<vector<int>>arr(n, vector<int>(2));
    for (int i = 0; i < n; i++) {
        cin >> arr[i][0] >> arr[i][1];
    }
    sort(arr.begin(), arr.end(), cmp);
    vector<int>suff_max(n);
    int tt = 0;
    for (int i = n - 1; i >= 0; i--) {
        tt = max(tt, arr[i][1]);
        suff_max[i] = tt;
    }
    multiset<int>M;
    int ans = 1e18;

    for (int i = 1; i < n; i++) {
        int tk = arr[i - 1][0];
        int mx_b = suff_max[i];

        if (M.size() > 0) {
            ans = min(ans, abs(arr[i][0] - max(*M.rbegin(), mx_b)));
            auto itt = M.lower_bound(mx_b);
            auto it = M.upper_bound(tk);
            if (it == M.end())it--;
            if (*it >= mx_b) {
                ans = min(ans, abs(tk - *it));
            }
            else {
                if (itt != M.end())
                    ans = min(ans, abs(tk - *itt));
            }
            it = M.lower_bound(tk);
            if (it == M.end())it--;
            if (*it > tk and it != M.begin())it--;
            if (*it >= mx_b) {
                ans = min(ans, abs(tk - *it));
            }
            else {
                if (itt != M.end())
                    ans = min(ans, abs(tk - *itt));
            }
        }
        else {
            ans = min(ans, abs(arr[i][0] - mx_b));
        }
        // cout<<ans<<endl;
        M.insert(arr[i - 1][1]);
    }
    // cout<<ans<<endl;
    // cout<<M.size()<<endl;
    // cout<<1;
    auto it = M.upper_bound(arr[n - 1][0]);
    if (it == M.end())it--;
    ans = min(ans, abs(arr[n - 1][0] - *it));
    it = M.lower_bound(arr[n - 1][0]);
    if (it == M.end())it--;
    if (*it > arr[n - 1][0] and it != M.begin())it--;
    ans = min(ans, abs(arr[n - 1][0] - *it));

    cout << ans << endl;
}
int32_t main() {

    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    int tt = 1;
    cin >> tt;
    while (tt--) {
        solve();
    }
}