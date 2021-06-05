API 설계
1. 전체 TODO 조회 (GET)
    /api/todo
    
2. 완료된 TODO 조회(GET)
    /api/todo/done
    
3. TODO 체크 (POST)
    {
        "id": int
    }
    
4. TODO 생성 (POST)
    /api/todo
    {
        "title": string,
        "content": string,
        "isDone": bool,
        "group_id": int (optional)
    },
    
    groupId 미 입력시 1로 고정(default group)
    
5. TODO 그룹 리스트 조회 (GET)
    /api/todoGroup/list
    
6. TODO 그룹 생성 (POST)
    /api/todoGroup
    {
        "name": "group1"
    }
    
7. TODO 그룹별 조회 (GET)
    /api/todo/list:id

DB 설계

TABLES
+-----------------------+
| Tables_in_idu_node_db |
+-----------------------+
| todoGroups            |
| todoLists             |
+-----------------------+


TodoLists
+----+-------+---------+--------+---------------------+---------------------+----------+
| id | title | content | isDone | createdAt           | updatedAt           | group_id |
+----+-------+---------+--------+---------------------+---------------------+----------+

TodoGroups
+----+---------+
| id | name    |
+----+---------+
