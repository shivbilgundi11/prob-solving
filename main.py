def best_profit(input):
    min_price = input[0]
    max_profit = 0

    for i in range(1, len(input)):
        curr_price = input[i]

        if curr_price < min_price:
            min_price = curr_price
        
        profit = curr_price - min_price

        if max_profit < profit:
            max_profit = profit
        
        
    return max_profit


print(best_profit([7, 1, 5, 3, 7, 4]))